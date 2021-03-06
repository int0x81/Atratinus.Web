import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CampaignDetailModalComponent } from '../campaign-detail-modal/campaign-detail-modal.component';
import { InvestmentCampaignMockService } from '../services/investment-campaign.service.mock';
import { InvestmentCampaign } from '../models/investmentCampaign';

@Component({
  selector: 'app-investor-map-page',
  templateUrl: './investor-map-page.component.html',
  styleUrls: ['./investor-map-page.component.sass']
})
export class InvestorMapPageComponent implements OnInit, OnDestroy {

  globe: ThreeGlobe;
  globeContainer: HTMLElement;
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  controls: OrbitControls;
  loadedCampaigns: Map<string, InvestmentCampaign>;

  investmentActivitiesSubscription: Subscription;

  constructor(private modalService: NgbModal, private investmentCampaignService: InvestmentCampaignMockService) { }

  ngOnInit() {
    this.investmentActivitiesSubscription =
    this.investmentCampaignService.investmentActivitiesSubject.subscribe((newCampaigns) => {
      this.loadedCampaigns = newCampaigns;
      const asArray = Array.from(this.loadedCampaigns, ([, value]) => value);
      this.renderGlobe(asArray);
    });

    window.addEventListener('resize', () => {
      this.adjustCanvas();
    });
   }

  renderGlobe(data: InvestmentCampaign[]) {
    this.globeContainer = document.getElementById('globeContainer');

    this.globe = new ThreeGlobe({ animateIn: true })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .arcsData(data)
      .arcDashAnimateTime(1000)
      .arcStartLng('investorLng')
      .arcStartLat('investorLat')
      .arcEndLng('subjectCompanyLng')
      .arcEndLat('subjectCompanyLat')
      .arcColor(() => 'white')
      .arcStroke(1)
      .labelsData(data)
      .labelLat('investorLat')
      .labelLng('investorLng')
      .labelText('investorName')
      .labelSize(() => 1)
      .labelDotRadius((d: any) => 0.7)
      .labelColor(() => 'white');

    // Setup scene
    this.scene = new THREE.Scene();
    this.scene.add(this.globe);
    this.scene.add(new THREE.AmbientLight(0xeeeeee));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    // Setup camera
    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.z = 300;

    // Add camera controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 260;
    this.controls.maxDistance = 500;
    this.controls.rotateSpeed = 0.3;
    this.controls.zoomSpeed = 0.3;

    this.adjustCanvas();
    this.animate();
  }

  adjustCanvas() {

    if(!this.globeContainer)
      return;

    if (document.contains(this.renderer.domElement)) {
      this.globeContainer.removeChild(this.renderer.domElement);
    }

    setTimeout(() => {
      const edgeLength = this.globeContainer.clientHeight > this.globeContainer.clientWidth ? this.globeContainer.clientWidth : this.globeContainer.clientHeight;
      this.camera.aspect = edgeLength / edgeLength;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(edgeLength, edgeLength, true);
      this.globeContainer.appendChild(this.renderer.domElement);
    }, 400);
  }

  animate() {
    //this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }

  openCampaignDetailModel(campaignId: string) {
    const campaign = this.loadedCampaigns.get(campaignId);
    const modalRef = this.modalService.open(CampaignDetailModalComponent, { size: 'xl' });
    (modalRef.componentInstance as CampaignDetailModalComponent).setInvestmentCampaign(campaign);
  }

  ngOnDestroy() {
    this.investmentActivitiesSubscription.unsubscribe();
  }
}
