'use strict'

/**
 * Module dependencies.
 */

import Keyboard from 'axis3d/input/keyboard'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Plane from 'axis3d/mesh/plane'
import Video from 'axis3d/media/video'
import Frame from 'axis3d/frame'
import Mouse from 'axis3d/input/mouse'
<<<<<<< HEAD
=======
import clamp from 'clamp'
>>>>>>> 2.0.x
import raf from 'raf'

// axis context
const ctx = Context({}, {regl: {attributes: {antialias: true}}})

// objects
const camera = Camera(ctx)
const frame = Frame(ctx)
const video = Video(ctx, '/paramotor.mp4')
const plane = Plane(ctx, {map: video})

Object.assign(window, {
  ctx, camera, frame, video, plane
})

camera.position.z = 1

<<<<<<< HEAD
raf(() => video.play())
=======
//raf(() => video.play())
>>>>>>> 2.0.x

// axis animation frame loop
frame(({time, viewportWidth, viewportHeight}) => {
  //if (
  const aspectRatio = viewportWidth/viewportHeight
  const height = plane.size.y
  const width = plane.size.x
  const dist = camera.position.z - plane.position.z
  const fov = 2.0*Math.atan((width/aspectRatio) / (2.0*dist))
  // draw camera scene
  camera({fov}, () => {
<<<<<<< HEAD
    plane.scale.set(1, height / video.aspectRatio, 1)
=======
    let min = Math.min, max = Math.max
    let ph = height, pw = width
    let wh = viewportHeight, ww = viewportWidth
    let vh = video.height, vw = video.width
    let vr = vw/vh
    let wr = ww/wh
    let x = clamp(vw/ww, 0, 1)
    let y = clamp(wh/vh, 0, 1)

    // not enough window width
    if (ww/wh > 2) {
      y = ww <= vw ? 1/vr : y/vr
      x =  y * vr
      console.log('a', ww <= vw, x, y)
      //x = ww <= vw ? 1 : x * vr
    } else if (ww/wh < 2) {
      //x = ww <= vw ? 1 : x
      x = 1
      y = (vw/ww)/vr
      //y = (ww/wh)/vr
      //y = x / vr
      console.log('b', x, y)
    } else {
      y = 1/vr
      x = 1
      console.log('c')
    }

    plane.scale.set(x, y, 1)
>>>>>>> 2.0.x
    plane()
  })
})
