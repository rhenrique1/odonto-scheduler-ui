import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-option-card',
  templateUrl: './home-option-card.component.html',
  styleUrls: ['./home-option-card.component.scss']
})
export class HomeOptionCardComponent {
  @Input() public optionCardData!: OptionCardData;
}

export interface OptionCardData {
  title: string;
  subtitle: string;
  imageSrc: string;
  iconClass: string;
  cardContent: string;
}