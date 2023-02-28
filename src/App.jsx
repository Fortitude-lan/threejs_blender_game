/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2023-02-28 13:10:52
 * @LastEditors: wanghexing
 * @LastEditTime: 2023-02-28 16:49:43
 */
import { World, Skybox, Model, ThirdPersonCamera, useKeyboard, useLoop } from "lingo3d-react"
import { useRef } from "react"
function App() {
  const key = useKeyboard()
  const characterRef = useRef()
  const keyWalk = ['w', 'Meta w']
  const keyArr = ['w', 'w Space', 'Meta w', 'Meta w Space']
  const movtion = keyWalk.includes(key) ? "walking" : key.includes('Space') ? "flip" : "idle"
  const sceneURL = "Grassland.glb"
  const moduleURL = {
    atm: {
      default: 'dijia/atm.fbx',
      idle: "dijia/atm_idle.fbx",
      walking: "dijia/atm_walk.fbx",
      flip: "dijia/atm_flip.fbx"
    },
    fox: {
      default: 'Fox.fbx',
      idle: "Idle.fbx",
      walking: "Walking.fbx"

    }
  }

  console.log(key.includes(keyWalk));
  useLoop(() => {
    characterRef.current.moveForward(-3)
  }, keyArr.includes(key))
  useLoop(() => {
    characterRef.current.moveForward(0)
  }, key === 'Space')
  return (
    <World>
      <Model src={sceneURL} scale={270} physics="map" />
      <ThirdPersonCamera active mouseControl>
        <Model
          ref={characterRef}
          src={moduleURL.atm.default}
          physics="character"
          animations={{ idle: moduleURL.atm.idle, walking: moduleURL.atm.walking, flip: moduleURL.atm.flip }}
          animation={movtion}
        />
      </ThirdPersonCamera>
      <Skybox texture="skybox.jpg" />
    </World>
  )
}

export default App
