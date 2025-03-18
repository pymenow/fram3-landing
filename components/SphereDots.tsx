"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface SphereDotProps {
  position?: "right" | "left" | "center"
  size?: number
  density?: number
  color?: string
  tilt?: number
  speed?: number
  useTransparency?: boolean
  expandHorizontally?: boolean
}

const SphereDots = ({
  position = "right",
  size = 5,
  density = 2000,
  color = "#007bff",
  tilt = 20,
  speed = 0.2,
  useTransparency = false,
  expandHorizontally = false,
}: SphereDotProps) => {
  const mountRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup with wider field of view for better visibility
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for performance
    mountRef.current.appendChild(renderer.domElement)

    // Create sphere of dots
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const sizes = []
    const colors = []
    const opacities = []

    // Generate random points on a sphere with horizontal expansion if needed
    for (let i = 0; i < density; i++) {
      // Use spherical distribution for points
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      // Apply horizontal expansion if requested
      let x, y, z
      if (expandHorizontally) {
        // Create an ellipsoid instead of a sphere (stretched horizontally)
        const horizontalStretch = 1.8 // Stretch factor for x-axis
        x = size * horizontalStretch * Math.sin(phi) * Math.cos(theta)
        y = size * Math.sin(phi) * Math.sin(theta)
        z = size * Math.cos(phi)
      } else {
        // Regular sphere
        x = size * Math.sin(phi) * Math.cos(theta)
        y = size * Math.sin(phi) * Math.sin(theta)
        z = size * Math.cos(phi)
      }

      vertices.push(x, y, z)

      // Random size for each dot - more variation
      const dotSize = useTransparency
        ? Math.random() * 1.2 + 0.1
        : // Larger variation when transparency is enabled
          Math.random() * 0.5 + 0.1 // Original variation
      sizes.push(dotSize)

      // White color with slight variation for depth
      const brightness = useTransparency ? 0.7 + Math.random() * 0.3 : 1.0
      const colorObj = new THREE.Color(color)
      const hsl = {}
      colorObj.getHSL(hsl)
      const newColor = new THREE.Color().setHSL(hsl.h, useTransparency ? hsl.s * 0.3 : hsl.s, brightness)
      colors.push(newColor.r, newColor.g, newColor.b)

      // Random opacity for twinkling effect - more pronounced with useTransparency
      opacities.push(
        useTransparency
          ? Math.random() * 0.9 + 0.1
          : // More variation when transparency is enabled
            Math.random() * 0.7 + 0.3, // Original variation
      )
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1))
    geometry.setAttribute("customColor", new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute("opacity", new THREE.Float32BufferAttribute(opacities, 1))

    // Create simpler material for dots
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.1,
      transparent: true,
      opacity: useTransparency ? 0.7 : 1.0,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    // Create a point cloud from the geometry and material
    const sphere = new THREE.Points(geometry, material)

    // Apply tilt
    sphere.rotation.x = THREE.MathUtils.degToRad(tilt)
    sphere.rotation.z = THREE.MathUtils.degToRad(tilt / 2)

    // Position the sphere based on the position prop
    if (position === "right") {
      sphere.position.x = window.innerWidth * 0.3
    } else if (position === "left") {
      sphere.position.x = -window.innerWidth * 0.3
    }

    scene.add(sphere)

    // Helper function to create a circle texture for the dots
    function createCircleTexture() {
      const canvas = document.createElement("canvas")
      canvas.width = 64
      canvas.height = 64

      const context = canvas.getContext("2d")
      if (!context) return new THREE.Texture()

      context.beginPath()
      context.arc(32, 32, 28, 0, Math.PI * 2)
      context.closePath()

      // Create a radial gradient for softer dots
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.3)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      context.fillStyle = gradient
      context.fill()

      const texture = new THREE.Texture(canvas)
      texture.needsUpdate = true
      return texture
    }

    // Animation loop with subtle pulsing
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      // Update time uniform for twinkling effect
      // material.uniforms.time.value += 0.01

      // Rotate sphere with subtle pulsing
      sphere.rotation.y += speed * 0.01

      // Add subtle breathing effect to the sphere
      // const breathingScale = 1 + Math.sin(material.uniforms.time.value * 0.2) * 0.02
      // sphere.scale.set(breathingScale, breathingScale, breathingScale)

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)

      // Update sphere position on resize
      if (position === "right") {
        sphere.position.x = window.innerWidth * 0.3
      } else if (position === "left") {
        sphere.position.x = -window.innerWidth * 0.3
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
    }
  }, [position, size, density, color, tilt, speed, useTransparency, expandHorizontally])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-visible"
      style={{
        clipPath:
          position === "right"
            ? "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"
            : position === "left"
              ? "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
              : "none",
      }}
    />
  )
}

export default SphereDots

