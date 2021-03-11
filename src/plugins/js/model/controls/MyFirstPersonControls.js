var THREE = require('three')
THREE.MyFirstPersonControls = function (object, domElement) {

  if (domElement === undefined) {

    console.warn('THREE.MyFirstPersonControls: The second parameter "domElement" is now mandatory.');
    domElement = document;

  }

  this.object = object;
  this.domElement = domElement;
  this.lookSpeed = 0.6;
  this.target = new THREE.Vector3(0, 0, 0);


  var needUpdate = false;
  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();
  var spherical = new THREE.Spherical();
  var theta = 0;
  var phi = 0;
  var moving = false;
  this.onMouseDown = function (event) {
    if (event.button === 0) {
      moving = true;
      rotateStart.set(event.clientX, event.clientY);
    }
  }

  this.onMouseUp = function (event) {
    moving = false;
  }
  this.onMouseMove = function (event) {
    if (!moving)
      return;
    needUpdate = true;
    rotateEnd.set(event.clientX, event.clientY);
    rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(this.lookSpeed);
    theta = 2 * Math.PI * rotateDelta.x / this.domElement.clientHeight;
    phi = 2 * Math.PI * rotateDelta.y / this.domElement.clientHeight;
    rotateStart = rotateEnd.clone();
  }

  var _onMouseMove = bind(this, this.onMouseMove);
  var _onMouseDown = bind(this, this.onMouseDown);
  var _onMouseUp = bind(this, this.onMouseUp);

  function bind(scope, fn) {
    return function () {
      fn.apply(scope, arguments);
    };
  }

  this.domElement.addEventListener('mousemove', _onMouseMove, false);
  this.domElement.addEventListener('mousedown', _onMouseDown, false);
  this.domElement.addEventListener('mouseup', _onMouseUp, false);
  this.domElement.addEventListener('mouseout', _onMouseUp, false);


  this.dispose = function () {
    this.domElement.removeEventListener('mousedown', _onMouseDown, false);
    this.domElement.removeEventListener('mousemove', _onMouseMove, false);
    this.domElement.removeEventListener('mouseup', _onMouseUp, false);
    this.domElement.removeEventListener('mouseout', _onMouseUp, false);
  };


  this.update = function () {
    return function update() {
      if (!moving || !needUpdate) {
        phi = 0;
        theta = 0;
        this.object.lookAt(this.target);
      }
      var lookDirection = new THREE.Vector3();
      var quaternion = this.object.quaternion;
      lookDirection.set(0, 0, -1).applyQuaternion(quaternion);
      spherical.setFromVector3(lookDirection);
      var p = spherical.phi;
      var t = spherical.theta;
      t += theta;
      p -= phi;
      var position = this.object.position.clone();
      lookDirection.setFromSphericalCoords(1, p, t).add(position);
      this.object.lookAt(lookDirection);
      this.target = lookDirection;
      needUpdate = false;
    }
  }()

  this.setOrientation = function (controls) {
    var lookDirection = new THREE.Vector3();
    var quaternion = controls.object.quaternion;
    lookDirection.set(0, 0, -1).applyQuaternion(quaternion);
    spherical.setFromVector3(lookDirection);

    var position = controls.object.position.clone();
    lookDirection.setFromSphericalCoords(1, spherical.phi, spherical.theta).add(position);
    controls.object.lookAt(lookDirection);
    controls.target = lookDirection;
  }

  this.setOrientation(this);
}
THREE.MyFirstPersonControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.MyFirstPersonControls.prototype.constructor = THREE.MyFirstPersonControls;
/* three-orbitcontrols addendum */
module.exports = exports.default = THREE.MyFirstPersonControls;
