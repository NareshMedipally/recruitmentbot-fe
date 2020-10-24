import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import swal from 'sweetalert2';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;
  admin:any;
  company:any;
  consultant:any;
  recruiter:any;
  role:any;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private authService: AuthService,
              private globals: ServicesService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

    this.role = localStorage.getItem('roleId');
    this.getStatus();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getStatus(){
    if(this.role == 1){
      this.globals.showLoading('');
      this.authService.getDashStatus().subscribe((res)=>{
        if(res.body.result_code == 200){
          console.log(res);
          this.admin = res.body.admin[0].count;
          this.company = res.body.company[0].count;
          this.consultant = res.body.consultant[0].count;
          this.recruiter = res.body.recruiter[0].count;
          this.globals.hideLoading('');
        }
      },err=> {
        swal.fire('', 'Something went wrong!', 'error')
      })
    }else if(this.role == 2 || this.role == 3){
      this.globals.showLoading('');
      this.authService.getRecStatus(localStorage.getItem('company_Name')).subscribe((res)=>{
        if(res.body.result_code == 200){
          console.log(res);
          this.consultant = res.body.consultant[0].count;
          this.recruiter = res.body.recruiter[0].count;
          this.globals.hideLoading('');
        }
      },err=> {
        swal.fire('', 'Something went wrong!', 'error')
      })
    }
  }
}
