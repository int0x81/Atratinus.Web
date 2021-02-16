import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { InvestmentActivityService } from '../investment-activity.service';

@Component({
  selector: 'app-investor-map-page',
  templateUrl: './investor-map-page.component.html',
  styleUrls: ['./investor-map-page.component.sass']
})
export class InvestorMapPageComponent implements AfterViewInit {

  globeContainer: HTMLElement;
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  camera = new THREE.PerspectiveCamera();
  scene = new THREE.Scene();
  controls: OrbitControls;

  constructor(private investmentActivityService: InvestmentActivityService) { }

  ngAfterViewInit(): void {

    this.globeContainer = document.getElementById('globeContainer');
    const data = this.investmentActivityService.getInvestmentActivities('', '');

    const Globe = new ThreeGlobe({ animateIn: false })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .arcsData(data)
      .arcDashAnimateTime(1000)
      .arcColor('color')
      .arcStroke(1)
      .labelsData(data)
      .labelLat('startLat')
      .labelLng('startLng')
      .labelText('investorName')
      .labelSize('labelSize')
      .labelDotRadius((d: any) => 1)
      .labelColor('color');

    // Setup scene
    this.scene.add(Globe);
    this.scene.add(new THREE.AmbientLight(0xbbbbbb));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    this.adjustCanvas();

    // Setup camera
    this.camera.position.z = 300;

    // Add camera controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 260;
    this.controls.maxDistance = 500;
    this.controls.rotateSpeed = 0.8;
    this.controls.zoomSpeed = 1;

    window.addEventListener('resize', () => {
        this.adjustCanvas();
    });

    this.animate();
  }

  adjustCanvas() {

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
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }
}
