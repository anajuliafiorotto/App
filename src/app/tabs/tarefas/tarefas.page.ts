import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {
  tasks : any[] = [];
  constructor(private alertCtrl: AlertController, private utilService : UtilService, private actionSheetCtrl : ActionSheetController) { 
    let taskJson = localStorage.getItem('taskDb');
    if(taskJson != null){
      this.tasks = JSON.parse(taskJson);
    }
  }

  ngOnInit() {
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'Qual tarefa você deseja criar?',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'Qual tarefa você deseja criar'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('clicked cancel')
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            console.log(form.newTask);
            this.add(form.newTask);
          }
        }
      ]
    });
    await alert.present();
  }

  async add(newTask: string) {
    if (newTask.trim().length < 1) {
      this.utilService.showToast('Informe o que deseja fazer!');
      
      return;
    }

    let task = {name : newTask, done: false};

    this.tasks.push(task);

    this.updateLocalStorage();
  }

  updateLocalStorage(){
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
  }

  async openActions(task : any){
    task.done = !task.done;
    this.updateLocalStorage();
  }

  async delete(task : any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: "VOCÊ DESEJA EXCLUIR?",
      buttons: [{
        text: 'Confirmar',
        icon: 'trash-outline',
        handler: () => {
          this.tasks = this.tasks.filter(taskArray => task != taskArray);
          this.updateLocalStorage();
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async edit(task : any){
    const alert = await this.alertCtrl.create({
      header: 'Qual alteração você deseja fazer?',
      inputs: [
        {
          name: 'oldTask',
          type: 'text',
          placeholder: task.name
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('clicked cancel')
          }
        },
        {
          text: 'Alterar',
          handler: (form) => {
            console.log(form.oldTask);
            task.name = form.oldTask;
            this.updateLocalStorage();
          }
        }
      ]
    });
    await alert.present();
  }
}
