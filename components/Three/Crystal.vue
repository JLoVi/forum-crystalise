<template>
  <div
    id="container"
    class="cont"
  />
</template>

<script>
import * as THREE from 'three'
import { OBJLoader, OrbitControls } from 'three-full'

export default {
  name: 'ThreeTest',
  data() {
    return {
      container: null,
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      dirLight: null,
      ambientLight: null,
      controls: null,
      boxes: null,
      model: null,
      refractionMat: null,
      counter: 1,
      allCrystals: [1, 2, 3, 4, 5],
      availableCrystals: [1, 2, 3, 4, 5],
      currentCrystal: 1
    }
  },
  mounted() {
    this.init()
    this.animate()
    // this.loadModels()
    this.loadRandomCrystal()
  },
  methods: {
    init: function () {
      // let container = document.getElementById('container');
      const container = document.getElementById('container')

      this.camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.01, 1000)
      this.camera.position.z = 4

      this.dirLight = new THREE.DirectionalLight({ color: '0xFFFFFF', castShadows: false })
      this.ambientLight = new THREE.AmbientLight({ color: '0x111111' })

      this.scene = new THREE.Scene()

      this.scene.add(this.dirLight, this.ambientLight)

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.005 // orig vue project value: 0.005, but
      this.controls.rotateSpeed = 0.001 // not specified in orig vue project, but default value would be otherwise '1', waaaay ttooo FAST
      this.controls.autoRotate = true
      this.controls.autoRotateSpeed = 0.01

      this.controls.minDistance = 1
      this.controls.maxDistance = 10

      this.controls.enablePan = false

      this.light_update()
      container.appendChild(this.renderer.domElement)
    },
    light_update() {
      this.dirLight.position.copy(this.camera.position)
      this.dirLight.position.x -= 5
    },
    loadObj(objUrl, cmapUrl, nmapUrl, rmapUrl) {
      const loader = new OBJLoader()

      const scn = this.scene

      const material = new THREE.MeshStandardMaterial()

      const urls = [
        'crystal/texture/grad.jpg', 'crystal/texture/grad.jpg',
        'crystal/texture/grad.jpg', 'crystal/texture/grad.jpg',
        'crystal/texture/grad.jpg', 'crystal/texture/grad.jpg'
      ]

      const textureCube = new THREE.CubeTextureLoader().load(urls)
      textureCube.mapping = THREE.CubeRefractionMapping

      const colorMap = new THREE.TextureLoader().load(cmapUrl)
      const normalMap = new THREE.TextureLoader().load(nmapUrl)

      loader.load(objUrl, function (object) {
        material.roughness = 0.1 // attenuates roughnessMap
        material.metalness = 0.16 // attenuates metalnessMap
        material.refractionRatio = 0.8
        material.envMap = textureCube
        material.envMapIntensity = 1.6
        material.normalMap = normalMap
        material.map = colorMap
        material.opacity = 0.9
        object.traverse(function (child) {
          if (child.type === 'Mesh') {
            child.material = material
            child.translateY(-0.21)
          }
        })
        console.log('loaded all') // eslint-disable-line no-console
        scn.add(object)
      }, function (xhr) {
        console.log('loading in progress') // eslint-disable-line no-console
      }, function (error) {
        if (error) {
          console.log(error.stack) // eslint-disable-line no-console
        }
        console.log('An error happened') // eslint-disable-line no-console
      }
      )
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      this.light_update()
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    },

    loadCrystal(index) {
      const crystal1objUrl = 'crystal/crystals/crystal_0' + index + '/Blue-' + index + '.obj'
      const crystal1cmap = 'crystal/crystals/crystal_0' + index + '/Blue-' + index + '_baseTexBaked.jpg'
      const crystal1nmap = 'crystal/crystals/crystal_0' + index + '/Blue-' + index + '_normals.jpg'
      const crystal1rmap = 'crystal/texture/crystal_rmap.jpg'
      this.loadObj(crystal1objUrl, crystal1cmap, crystal1nmap, crystal1rmap)
    },
    loadModels: function () {
      this.loadCrystal(2)
    },
    loadRandomCrystal() {
      // check if availableCrystal[] is empty
      if (this.availableCrystals.length === 0) {
        // if availableCrystal[] is empty -> fill from allCrystal[]
        this.availableCrystals = this.allCrystals
      }

      // get a random index from availableCrystal[]
      this.currentCrystal = (Math.floor(Math.random() * this.availableCrystals.length)) + 1

      // load random crystal
      this.loadCrystal(this.currentCrystal)

      // remove the used index from availableCrystal[]
      const index = this.availableCrystals.indexOf(this.currentCrystal)
      this.availableCrystals.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .cont{
    width: 100vw;
    height: 100vh;

    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
  }

  canvas{
    width: 100%;
    height: 100%;
  }
</style>
