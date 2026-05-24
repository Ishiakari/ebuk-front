import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { WebView } from 'react-native-webview';
import COLORS from '../theme/colors';
import { ICONS } from '../theme/icons';
import { API_URL } from '../../config';
import { saveReadingProgress, getReadingProgress } from '../services/readingProgressStorage';
import { styles } from '../../styles';

export default function ReadContentScreen({ route, navigation }) {
  const { book } = route.params;
  const fileName = book?.file?.file_path?.split('/').pop() || book?.title || 'Document.pdf';
  const fileUrl = book?.file?.file_path;
  
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const webviewRef = useRef(null);

  // Load saved reading progress when screen mounts
  useEffect(() => {
    const loadProgress = async () => {
      const savedPage = await getReadingProgress(book?.id);
      if (savedPage) {
        setCurrentPage(savedPage);
      }
    };
    loadProgress();
  }, [book?.id]);

  // Save progress whenever currentPage changes
  useEffect(() => {
    const saveProgress = async () => {
      if (currentPage > 1 || totalPages > 1) {
        await saveReadingProgress(book?.id, currentPage);
      }
    };
    saveProgress();
  }, [currentPage, book?.id, totalPages]);

  // Save progress when navigating away
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        saveReadingProgress(book?.id, currentPage);
      };
    }, [currentPage, book?.id])
  );

  const pdfJsHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
      <style>
        body { 
          margin: 0; 
          background: #EDEFF5; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
          overflow: hidden; 
        }
        canvas { 
          box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
          border-radius: 4px; 
        }
        #error { color: #EF4444; font-family: sans-serif; text-align: center; padding: 20px; }
      </style>
    </head>
    <body>
      <div id="pdf-container"></div>
      <script>
        const url = '${fileUrl}';
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        let pdfDoc = null;
        let pageRendering = false;
        let pageNumPending = null;
        const container = document.getElementById('pdf-container');

        function renderPage(num) {
          pageRendering = true;
          pdfDoc.getPage(num).then(page => {
            const unscaledViewport = page.getViewport({ scale: 1.0 });
            
            // Fit exactly within the screen (95% to leave a tiny margin)
            const scaleWidth = (window.innerWidth * 0.95) / unscaledViewport.width;
            const scaleHeight = (window.innerHeight * 0.95) / unscaledViewport.height;
            const scale = Math.min(scaleWidth, scaleHeight);

            const viewport = page.getViewport({ scale: scale });
            
            container.innerHTML = ''; 
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            container.appendChild(canvas);
            
            const renderContext = { canvasContext: context, viewport: viewport };
            const renderTask = page.render(renderContext);

            renderTask.promise.then(() => {
              pageRendering = false;
              if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
              }
            });
          });
        }

        window.goToPage = function(num) {
          if (pageRendering) {
            pageNumPending = num;
          } else {
            renderPage(num);
          }
        };

        pdfjsLib.getDocument(url).promise.then(pdf => {
          pdfDoc = pdf;
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'INIT', totalPages: pdf.numPages }));
          renderPage(1);
        }).catch(err => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ERROR', message: err.message }));
          document.body.innerHTML = '<div id="error"><h3>Could not load document</h3><p>' + err.message + '</p></div>';
        });
      </script>
    </body>
  </html>
  `;

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'INIT') {
        setTotalPages(data.totalPages);
        setLoading(false);
        // Load the saved page if it exists (with a small delay to ensure PDF is ready)
        if (currentPage > 1) {
          setTimeout(() => {
            webviewRef.current?.injectJavaScript(`window.goToPage(${currentPage}); true;`);
          }, 300);
        }
      } else if (data.type === 'ERROR') {
        setLoading(false);
      }
    } catch (e) {}
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      webviewRef.current?.injectJavaScript(`window.goToPage(${newPage}); true;`);
    }
  };

  return (
    <View style={styles.readContentContainer}>
      <View style={styles.readContentHeader}>
        <Text style={styles.readContentHeaderTitle} numberOfLines={1}>{fileName}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.readContentCloseButton}>
          <SvgXml xml={ICONS.close} />
        </TouchableOpacity>
      </View>

      <View style={styles.readContentDocumentArea}>
        {loading && (
          <View style={styles.readContentLoadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.primaryAction} />
          </View>
        )}
        <WebView
          ref={webviewRef}
          source={{ html: pdfJsHtml, baseUrl: API_URL.replace('/api', '') }}
          onMessage={handleMessage}
          style={styles.readContentWebview}
          originWhitelist={['*']}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
        />
      </View>

      {!loading && totalPages > 0 && (
        <View style={styles.readContentFooter}>
          <TouchableOpacity 
            style={styles.readContentNavButton} 
            onPress={() => changePage(currentPage - 1)}
          >
            <Text style={styles.readContentNavButtonText}>❮</Text>
          </TouchableOpacity>
          
          <Text style={styles.readContentPageIndicator}>Page {currentPage} / {totalPages}</Text>
          
          <TouchableOpacity 
            style={styles.readContentNavButton}
            onPress={() => changePage(currentPage + 1)}
          >
            <Text style={styles.readContentNavButtonText}>❯</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
