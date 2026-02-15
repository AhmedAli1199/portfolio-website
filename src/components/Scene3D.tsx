import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff88"
        size={0.018}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  )
}

function GlowingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.18} />
    </mesh>
  )
}

function DataStreams() {
  const lines = useMemo(() => {
    const lineData: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = []
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2
      lineData.push({
        start: new THREE.Vector3(Math.cos(angle) * 3, -3, Math.sin(angle) * 3),
        end: new THREE.Vector3(Math.cos(angle) * 1.5, 1.5, Math.sin(angle) * 1.5),
        color: i % 2 === 0 ? '#00ff88' : '#ff6b35'
      })
    }
    return lineData
  }, [])

  return (
    <group>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  line.start.x, line.start.y, line.start.z,
                  line.end.x, line.end.y, line.end.z
                ]),
                3
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={line.color} transparent opacity={0.18} />
        </line>
      ))}
    </group>
  )
}

function GridPlane() {
  return (
    <gridHelper 
      args={[30, 30, '#2563eb', '#1a365d']} 
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b35" />
        
        <ParticleField />
        <GlowingOrb />
        <DataStreams />
        <GridPlane />
      </Canvas>
    </div>
  )
}
