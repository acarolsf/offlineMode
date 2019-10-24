import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Platform, ToastController } from '@ionic/angular';
import { ConnectionStatus } from '../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  posts: any = [];

  constructor(private apiService: ApiService, private plt: Platform,
              public toastController: ToastController) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
    });
  }

  loadData(refresh = false, refresher?) {
    this.apiService.getPosts(refresh).subscribe(res => {
      this.posts = res;
      console.log(this.posts);
      if (refresher) {
        refresher.target.complete();
      }
      if (!ConnectionStatus) {
        this.presentToast();
      }
      if (ConnectionStatus) {
        this.presentToast2();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Conecte à uma rede!',
      duration: 2000
    });
    toast.present();
  }

  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'Rede ativa!',
      duration: 2000
    });
    toast.present();
  }

  updateUser(id) {
    this.apiService.updateUser(id, {name: 'Simon', job: 'CEO'}).subscribe();
  }
}
