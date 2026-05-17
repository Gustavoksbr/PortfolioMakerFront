import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  public async gerarPdfPortfolio(
    elemento: HTMLElement,
    nomeArquivo: string = 'portfolio.pdf'
  ): Promise<void> {

    if (!elemento) {
      throw new Error('Elemento para geração do PDF não foi informado.');
    }

    const canvas = await html2canvas(elemento, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: -window.scrollY,
      width: elemento.scrollWidth,
      height: elemento.scrollHeight,
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pageCanvasHeight = Math.floor((canvasWidth * pdfHeight) / pdfWidth);

    let renderedHeight = 0;

    while (renderedHeight < canvasHeight) {
      const sliceHeight = Math.min(pageCanvasHeight, canvasHeight - renderedHeight);
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvasWidth;
      sliceCanvas.height = sliceHeight;

      const context = sliceCanvas.getContext('2d');
      if (!context) {
        throw new Error('Não foi possível criar o contexto do canvas para gerar o PDF.');
      }

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      context.drawImage(
        canvas,
        0,
        renderedHeight,
        canvasWidth,
        sliceHeight,
        0,
        0,
        canvasWidth,
        sliceHeight
      );

      const imgData = sliceCanvas.toDataURL('image/png');
      const slicePdfHeight = (sliceHeight * pdfWidth) / canvasWidth;

      if (renderedHeight > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, slicePdfHeight);
      renderedHeight += sliceHeight;
    }

    pdf.save(nomeArquivo);
  }
}
