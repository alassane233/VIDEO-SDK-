import {Component, OnInit} from '@angular/core';
import ZoomVideo from "@zoom/videosdk";
import uitoolkit from '@zoom/videosdk-ui-toolkit'
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'
import {config} from "rxjs";
import Index from "@zoom/videosdk-ui-toolkit";
import {ToastrService} from "ngx-toastr";
import _default from "@zoom/videosdk-ui-toolkit";
import closePreview = _default.closePreview;
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit{
  client = ZoomVideo.createClient();
  stream:any;
  clicked = false;
  buttonJoin = true;
  authEndpoint = 'http://localhost:4000/';
  getSign = '';

  config = {
    videoSDKJWT: '',
    sessionName: 'SessionA',
    userName: 'UserA',
    sessionPasscode: 'abc123',
    features: ['video', 'audio', 'share', 'chat', 'users', 'settings']
  }


  constructor(private toastrService: ToastrService, private httpClient: HttpClient) {
  }

getSignnature(){
    this.httpClient.post(this.authEndpoint,  {
      sessionName :'SessionA',
      role : 1,
      sessionKey : '',
      userIdentity: ''
    }).subscribe({
        next: (data: any) => {
          if (data.signature) {
            console.log(data.signature);
            this.config.videoSDKJWT = data.signature
            this.openSession(this.config);
          } else {
            console.log(data);
          }
        }, error: error => {
          console.log(error);
        }
      }
      )
}
  ngOnInit(): void {

this.openView()
  }
  sessionJoined = (() => {
    this.toastrService.success('JOIN SUCCESS',this.config.sessionName);
    this.buttonJoin = false
  })

  sessionClosed = (() => {
   this.toastrService.info('CLOSE SUCCESS',this.config.sessionName);
   this.buttonJoin = true;
   this.clicked = false;
   this.openView();
  })
  openView(){
    const  previewContainer = document.getElementById('previewContainer')!;
    uitoolkit.openPreview(previewContainer);

  }
  cloveView (){
    const  previewContainer = document.getElementById('previewContainer')!;

    uitoolkit.closePreview(previewContainer)
  }

  openSession(config: {
    features: string[];
    sessionPasscode: string;
    sessionName: string;
    videoSDKJWT: string;
    userName: string
  }){
    const sessionContainer = document.getElementById('sessionContainer')!
    uitoolkit.joinSession(sessionContainer, config);
   this.cloveView();
    uitoolkit.onSessionJoined(this.sessionJoined)
    uitoolkit.onSessionClosed(this.sessionClosed)
  }
  videoZoom (){
    this.client.init('en-US', 'Global', { patchJsMedia: true }).then(() => {
      this.client
        .join('Cool Cars', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoicE80ZzJXUGZRenl0YUlYeVV5cEVIdyIsInJvbGVfdHlwZSI6MSwidHBjIjoiQ29vbCBDYXJzIiwidmVyc2lvbiI6MSwiaWF0IjoxNzEyOTQ4ODMzLCJleHAiOjE3MTI5NTYwMzMsInVzZXJfaWRlbnRpdHkiOiJ1c2VyMTIzIiwic2Vzc2lvbl9rZXkiOiJzZXNzaW9uMTIzIn0.RGYTwINSJ5P7FJpBx3Hm9jH46KLrmYZBgIKumIIGYEc', 'userName', 'sessionP')
        .then(() => {
          this.stream =this.client.getMediaStream()
        })
    })
  }

  protected readonly _default = Index;


}
