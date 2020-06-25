import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { UserDeck } from '../../../models/user-deck';
import { UserDataService } from '../../../user-data.service';
import { Renderer2 } from '@angular/core';
import { BreakpointService } from '../../../breakpoint.service';

import { stringify } from 'querystring';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit, AfterViewInit, OnChanges{

  @ViewChild('deckRef') private deckElement: ElementRef;
  @Input('deck') public deck: UserDeck;
  @Input() private width: number;
  @Input() private height: number;

  constructor(private renderer: Renderer2, public userDataService: UserDataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.height.firstChange) {
      this.renderImage();
    }
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderImage();
  }

  private renderImage() {
        this.renderer.setStyle(this.deckElement.nativeElement, 'background-image', 'url(\'https://dd.b.pvp.net/1_0_0/set' + this.deck.deckImage.code[1] + '/en_us/img/cards/' + this.deck.deckImage.code + '-full.png\')');
        this.renderer.setStyle(this.deckElement.nativeElement, 'width', this.width + 'px');
        this.renderer.setStyle(this.deckElement.nativeElement, 'height', this.height + 'px');
  }

}
