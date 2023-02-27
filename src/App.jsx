import { World, Cube, Model, OrbitCamera, useLoop, Skybox } from "lingo3d-react"
import { useState, useRef } from "react"

function App() {
  let [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  let [walking, setWalking] = useState(false)
  let modelRef = useRef()

  let handleClick = (ev) => {
    ev.point.y = 0
    setPosition(ev.point)
    setWalking(true)

    let model = modelRef.current
    console.log('sss', model)

    model.lookAt(ev.point)
  }

  let handleIntersect = () => {
    setWalking(false)
  }

  useLoop(() => {
    let model = modelRef.current
    model.moveForward(-1)

  }, walking)

  return (
    <World>
      <Skybox texture="Cosmos.webp" />
      <Cube width={9999} depth={9999} y={-100}  onClick={handleClick} texture='gr.webp' textureRepeat={50}/>
      <Model
        // scaleX={1.5}
        // scaleY={1.5}
        // scaleZ={1.5}
        // x={0}
        // y={100}
        // z={0}
        ref={modelRef}
        src="./dijia/atm.fbx"
        animations={{ idle: "./dijia/Warrior Idle.fbx", walking: "./dijia/Walking With Shopping Bag.fbx" }}
        animation={walking ? "walking" : "idle"}
        intersectIDs={["orangeBox"]}
        onIntersect={handleIntersect}
      />
      <OrbitCamera active z={300} />
      <Cube id="orangeBox" scale={0.5} color="orange" x={position.x} y={position.y} z={position.z} visible={false} />
    </World>
  )
}

export default App
