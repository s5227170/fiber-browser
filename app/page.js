"use client"
import { Experience } from '@/Components/Experience/Experience'
import { Backdrop, OrbitControls, PerspectiveCamera, ScrollControls, useHelper, } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from "three";

export default function Home() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];
  // rotateOnAxis={((0, 5, 0), THREE.MathUtils.degToRad(100))} (0.5, 1.9, -0.5)

  // function blogScroll(e) {
  //   console.log(e);
  // }

  // useEffect(() => {
  //   document.addEventListener("scroll", blogScroll);

  //   return () => {
  //     document.removeEventListener("scroll", blogScroll);
  //   };
  // }, []);


  return (
    <section id="base">
      <Canvas shadows >
        <ScrollControls
          pages={items ? items.length * 0.36 : 0}
          horizontal
          damping={1}
        >
          {items ?
            <Experience blogs={items} />
            :
            null}

        </ScrollControls>

      </Canvas>
    </section>
  )
}
