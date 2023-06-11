import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-option-card',
  templateUrl: './home-option-card.component.html',
  styleUrls: ['./home-option-card.component.scss']
})

export class HomeOptionCardComponent {
  @Input() public title: string;
  @Input() public subtitle: string;
  @Input() public imageSrc: string;
  @Input() public iconClass: string;
  @Input() public cardContent: string;
}