import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { WebView } from 'react-native-webview';
import { COLORS } from '../theme/colors';
import { ICONS } from '../theme/icons';
import { API_URL } from '../../config';

export default function ReadContentScreen({ route, navigation }) {
  const { book } = route.params;
  const fileName = book?.file?.file_path?.split('/').pop() || book?.title || 'Document.pdf';
  const fileUrl = book?.file?.file_path;
  
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const webviewRef = useRef(null);

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>{fileName}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <SvgXml xml={ICONS.close} />
        </TouchableOpacity>
      </View>

      <View style={styles.documentArea}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.primaryAction} />
          </View>
        )}
        <WebView
          ref={webviewRef}
          source={{ html: pdfJsHtml, baseUrl: API_URL.replace('/api', '') }}
          onMessage={handleMessage}
          style={styles.webview}
          originWhitelist={['*']}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
        />
      </View>

      {!loading && totalPages > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => changePage(currentPage - 1)}
          >
            <Text style={styles.navButtonText}>❮</Text>
          </TouchableOpacity>
          
          <Text style={styles.pageIndicator}>Page {currentPage} / {totalPages}</Text>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => changePage(currentPage + 1)}
          >
            <Text style={styles.navButtonText}>❯</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 20,
  },
  closeButton: {
    padding: 5,
  },
  documentArea: {
    flex: 1,
    backgroundColor: '#EDEFF5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: '#EDEFF5',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    margin: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  navButtonText: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pageIndicator: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
