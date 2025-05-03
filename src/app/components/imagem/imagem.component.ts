// app.component.ts
import {Component, OnInit} from '@angular/core';
import {ImageService} from '../../services/images/ImageService';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-imagem',
  standalone: true,
  templateUrl: './imagem.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './imagem.component.scss'
})

export class ImagemComponent implements OnInit {
  selectedFile!: File;
  images: { id: string; name: string; url: string }[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.loadImages();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    this.imageService.upload(this.selectedFile).subscribe(() => this.loadImages());
  }

  loadImages() {
    this.imageService.getAllImages().subscribe(imageList => {
      this.images = [];

      imageList.forEach(img => {
        this.imageService.download(img.id).subscribe(blob => {
          const reader = new FileReader();
          reader.onload = () => {
            const url = reader.result as string;
            this.images.push({
              id: img.id,
              name: img.name,
              url: url
            });
          };
          reader.readAsDataURL(blob);
        });
      });
    });
  }
  download(id: string, name: string) {
    this.imageService.download(id).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name;
      link.click();
    });
  }
}
