class SimplePDFViewer {
    constructor() {
        this.pdfDoc = null;
        this.scale = 1.0;
        this.isLoading = false;
        this.renderedPages = new Set();
        
        this.initElements();
        this.bindEvents();
    }

    // initElements() 함수에서 컨트롤 관련 부분을 다음과 같이 수정
    initElements() {
        this.uploadSection = document.getElementById('upload-section');
        this.viewerSection = document.getElementById('viewer-section');
        this.fileInput = document.getElementById('file-input');
        this.uploadBtn = document.getElementById('upload-btn');
        this.uploadArea = document.getElementById('upload-area');
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebar-toggle');
        this.pagesWrapper = document.getElementById('pages-wrapper');
        this.zoomDisplay = document.getElementById('zoom-display');
        
        // 버튼들 (사이드바에서 찾기)
        this.newFileBtn = document.getElementById('new-file');
        this.zoomFitBtn = document.getElementById('zoom-fit');
        this.copyBtn = document.getElementById('copy-selected');
        this.zoomOutBtn = document.getElementById('zoom-out');
        this.zoomInBtn = document.getElementById('zoom-in');
        this.fitWidthBtn = document.getElementById('fit-width');
        this.actualSizeBtn = document.getElementById('actual-size');
    }


    bindEvents() {
        // 업로드 이벤트
        this.fileInput.onchange = (e) => this.handleFile(e.target.files[0]);
        this.uploadBtn.onclick = () => this.fileInput.click();
        this.uploadArea.onclick = () => this.fileInput.click();
        
        // 드래그 앤 드롭
        this.uploadArea.ondragover = (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        };
        this.uploadArea.ondragleave = () => {
            this.uploadArea.classList.remove('dragover');
        };
        this.uploadArea.ondrop = (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            if (e.dataTransfer.files[0]) {
                this.handleFile(e.dataTransfer.files[0]);
            }
        };
        
        // 사이드바
        this.sidebarToggle.onclick = () => {
            this.sidebar.classList.toggle('expanded');
        };
        
        // 버튼 이벤트
        this.newFileBtn.onclick = () => this.reset();
        this.zoomFitBtn.onclick = () => this.fitToWidth();
        this.copyBtn.onclick = () => this.copySelected();
        this.zoomOutBtn.onclick = () => this.zoomOut();
        this.zoomInBtn.onclick = () => this.zoomIn();
        this.fitWidthBtn.onclick = () => this.fitToWidth();
        this.actualSizeBtn.onclick = () => this.actualSize();
        
        // 키보드
        document.onkeydown = (e) => {
            if (this.viewerSection.classList.contains('hidden')) return;
            
            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                this.zoomIn();
            } else if (e.key === '-') {
                e.preventDefault();
                this.zoomOut();
            }
        };
    }

    async handleFile(file) {
        if (!file || this.isLoading) return;
        
        if (file.type !== 'application/pdf') {
            alert('PDF 파일만 업로드 가능합니다.');
            return;
        }

        this.isLoading = true;
        this.showLoading();

        try {
            const arrayBuffer = await file.arrayBuffer();
            const typedArray = new Uint8Array(arrayBuffer);
            
            this.pdfDoc = await pdfjsLib.getDocument(typedArray).promise;
            
            this.showViewer();
            this.scale = this.calculateOptimalScale();
            await this.renderAllPages();
            this.updateZoomDisplay();
            
        } catch (error) {
            console.error('PDF 로딩 오류:', error);
            alert('PDF 로딩 중 오류가 발생했습니다.');
        } finally {
            this.isLoading = false;
        }
    }

    showLoading() {
        this.uploadSection.innerHTML = `
            <div class="upload-container">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>PDF 로딩 중...</p>
                </div>
            </div>
        `;
    }

    showViewer() {
        this.uploadSection.classList.add('hidden');
        this.viewerSection.classList.remove('hidden');
    }

    calculateOptimalScale() {
        const containerWidth = this.pagesWrapper.clientWidth || 800;
        return Math.min(1.5, (containerWidth - 40) / 595);
    }

    async renderAllPages() {
        // 모든 기존 페이지 완전히 제거
        this.pagesWrapper.innerHTML = '';
        this.renderedPages.clear();
        
        const totalPages = this.pdfDoc.numPages;
        
        // 페이지를 순차적으로 렌더링
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            await this.renderSinglePage(pageNum);
        }
    }

    async renderSinglePage(pageNum) {
        if (this.renderedPages.has(pageNum)) {
            return;
        }

        try {
            const page = await this.pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: this.scale });
            
            // 페이지 컨테이너 생성
            const pageDiv = document.createElement('div');
            pageDiv.className = 'pdf-page';
            pageDiv.setAttribute('data-page-number', pageNum);
            pageDiv.style.cssText = `
                position: relative;
                width: ${viewport.width}px;
                height: ${viewport.height}px;
                margin-bottom: 20px;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border-radius: 8px;
                overflow: hidden;
            `;
            
            // Canvas 생성
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-canvas';
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.cssText = `
                width: 100%;
                height: auto;
                display: block;
                position: relative;
                z-index: 1;
            `;
            
            // 텍스트 레이어 컨테이너 생성 (PDF.js 공식 방식)
            const textLayerDiv = document.createElement('div');
            textLayerDiv.className = 'textLayer';
            textLayerDiv.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
                opacity: 0.2;
                line-height: 1.0;
                z-index: 2;
            `;
            
            pageDiv.appendChild(canvas);
            pageDiv.appendChild(textLayerDiv);
            this.pagesWrapper.appendChild(pageDiv);
            
            // Canvas에 페이지 렌더링
            const context = canvas.getContext('2d');
            const renderTask = page.render({
                canvasContext: context,
                viewport: viewport
            });
            
            // 렌더링 완료 후 텍스트 레이어 렌더링
            await renderTask.promise;
            
            // 텍스트 컨텐츠 가져오기
            const textContent = await page.getTextContent();
            
            // PDF.js 공식 renderTextLayer 사용 (검색 결과 [3] 방식)
            pdfjsLib.renderTextLayer({
                textContent: textContent,
                container: textLayerDiv,
                viewport: viewport,
                textDivs: []
            });
            
            this.renderedPages.add(pageNum);
            
        } catch (error) {
            console.error(`페이지 ${pageNum} 렌더링 오류:`, error);
        }
    }

    async zoomIn() {
        if (this.isLoading) return;
        this.scale *= 1.25;
        await this.renderAllPages();
        this.updateZoomDisplay();
    }

    async zoomOut() {
        if (this.isLoading) return;
        this.scale *= 0.8;
        await this.renderAllPages();
        this.updateZoomDisplay();
    }

    async fitToWidth() {
        if (this.isLoading) return;
        this.scale = this.calculateOptimalScale();
        await this.renderAllPages();
        this.updateZoomDisplay();
    }

    async actualSize() {
        if (this.isLoading) return;
        this.scale = 1.0;
        await this.renderAllPages();
        this.updateZoomDisplay();
    }

    updateZoomDisplay() {
        const percent = Math.round(this.scale * 100);
        this.zoomDisplay.textContent = percent + '%';
    }

    copySelected() {
        const selected = window.getSelection().toString();
        if (selected) {
            navigator.clipboard.writeText(selected).then(() => {
                this.copyBtn.textContent = '✅ 복사됨';
                setTimeout(() => {
                    this.copyBtn.textContent = '📋 복사';
                }, 2000);
            }).catch(() => {
                const textarea = document.createElement('textarea');
                textarea.value = selected;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                this.copyBtn.textContent = '✅ 복사됨';
                setTimeout(() => {
                    this.copyBtn.textContent = '📋 복사';
                }, 2000);
            });
        } else {
            alert('복사할 텍스트를 선택해주세요.');
        }
    }

    reset() {
        this.uploadSection.classList.remove('hidden');
        this.viewerSection.classList.add('hidden');
        this.fileInput.value = '';
        this.isLoading = false;
        this.renderedPages.clear();
        location.reload();
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new SimplePDFViewer();
});
