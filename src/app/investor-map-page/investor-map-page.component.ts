import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-investor-map-page',
  templateUrl: './investor-map-page.component.html',
  styleUrls: ['./investor-map-page.component.sass']
})
export class InvestorMapPageComponent implements OnInit, AfterViewInit, OnDestroy {

  globeContainer: HTMLElement;
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera();
  scene = new THREE.Scene();
  controls: OrbitControls;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    this.globeContainer = document.getElementById('globeContainer');
    const data = this.createRandomData();

    const Globe = new ThreeGlobe({ animateIn: false })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .pathsData(data)
      .pathColor(() => ['rgba(0,0,255,0.4)', 'rgba(255,0,0,0.4)'])
      .pathDashLength(0.01)
      .pathDashGap(0.004)
      .pathDashAnimateTime(100000);

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
    this.controls.rotateSpeed = 1;
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

  createRandomData(): number[][][] {
    const N_PATHS = 10;
    const MAX_POINTS_PER_LINE = 10000;
    const MAX_STEP_DEG = 1;
    const MAX_STEP_ALT = 0.015;
    const gData = [...Array(N_PATHS).keys()].map(() => {
      let lat = (Math.random() - 0.5) * 90;
      let lng = (Math.random() - 0.5) * 360;
      let alt = 0;

      return [[lat, lng, alt], ...[...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys()].map(() => {
        lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
        lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
        alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
        alt = Math.max(0, alt);

        return [lat, lng, alt];
      })];
    });

    return gData;
  }

  ngOnDestroy(): void { }
}
