import { Component, OnInit, Input, ViewChild, AfterViewInit, Renderer2, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { UserDeck } from 'src/app/models/user-deck';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() private width: number;
  @Input() private height: number;
  @Input('deck') public deck: UserDeck;
  @ViewChild('setting') private settingContainer: ElementRef;

  constructor(private renderer: Renderer2, private userData: UserDataService) { }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.setSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.height.firstChange) {
      this.setSize();
    }
  }

  private setSize() {
    this.renderer.setStyle(this.settingContainer.nativeElement, 'height', this.height + 'px');
    this.renderer.setStyle(this.settingContainer.nativeElement, 'width', this.width + 'px');
  }

  public deleteDeck() {
    this.userData.userDecks = this.userData.userDecks.filter(d => d.deckCode !== this.deck.deckCode);
    this.userData.saveUserDecks();
  }
}
