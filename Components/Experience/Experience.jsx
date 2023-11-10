"use client";
import {
  OrbitControls,
  ScrollControls,
  useTexture,
  Decal,
  useHelper,
  PerspectiveCamera,
  Backdrop,
  useScroll,
  Scroll,
} from "@react-three/drei";
import { Blog } from "../Blog/Blog";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useLayoutEffect, useRef, useState } from "react";
import { PointLightHelper } from "three";
import { useEffect } from "react";

import gsap from "gsap";

import * as THREE from "three";
import { Page } from "../Page/Page";

const Light = () => {
  const ref = useRef();
  useHelper(ref, PointLightHelper, 1);

  return (
    <rectAreaLight
      width={20}
      height={20}
      ref={ref}
      // castShadow
      position={[-5, 10, 20]}
      intensity={0.7}
      rotation={[0, 0, 0]}
    />
  );
};

export const Experience = ({ blogs }) => {
  const [map] = useLoader(TextureLoader, ["/react.jpg"]);
  const [moveIndex, setMoveIndex] = useState(0);
  const cameraRef = useRef();
  const scroll = useScroll();
  const tl = useRef();
  const axesRef = useRef();
  const blogsRef = blogs.map((blog) => useRef(null));
  // const [blogConfigArr, setBlogConfigArr] = useState([]);
  // useHelper(cameraRef, THREE.CameraHelper);

  // useLayoutEffect(() => {
  //   tl.current = gsap.timeline();
  // }, []);

  // useEffect(() => {
  //   if (blogs.length) {
  //     const blogArr = [];
  //     blogs.map((item, index) => {
  //       blogArr.push({ status: false, index: index });
  //     });
  //     console.log(blogsRef.current);
  //     setBlogConfigArr(blogArr);
  //   }
  // }, [blogs]);

  // useFrame(() => {
  //   tl.current.seek(scroll.offset * tl.current.duration());
  // });

  const chosenhandler = (index) => {
    console.log(blogsRef[index].current);
    if (blogsRef[index].current.name == "active") {
      // console.log("V1");
      blogsRef[index].current.name = "";
      gsap.to(
        blogsRef[index].current.position,
        {
          duration: 2,
          z: blogsRef[index].current.position.z + 1,
          ease: "power4.out",
        },
        0
      );
      gsap.to(
        blogsRef[index].current.rotation,
        {
          duration: 2,
          _y: blogsRef[index].current.position._y - 0.3,
          ease: "power4.out",
        },
        0
      );
    } else {
      // console.log("V2");
      blogsRef[index].current.name = "active";
      gsap.to(
        blogsRef[index].current.position,
        {
          duration: 2,
          z: blogsRef[index].current.position.z - 1,
          ease: "power4.out",
        },
        0
      );
      gsap.to(
        blogsRef[index].current.rotation,
        {
          duration: 2,
          _y: blogsRef[index].current.position._y + 0.3,
          ease: "power4.out",
        },
        0
      );
    }
  };

  const blogGeneration = blogs.map((blog, index) => {
    const distance = 7 * index;
    const positioning = distance + index;
    console.log("blog" + index);
    return (
      <Blog
        scroll={scroll}
        position={[positioning, 3, -0.2 * index + 1]}
        // position={[positioning, 3, -1 * index + 1.7]}
        rotation={[0, -1.5, 0]}
        key={"blog" + index}
        innerRef={blogsRef[index]}
        onClick={(e) => chosenhandler(index)}
      />
    );
  });

  return (
    <>
      <axesHelper ref={axesRef} />
      <ambientLight intensity={0.5} />
      {/* <pointLightHelper /> */}
      <Light />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault={true}
        position={[0.1, 7.2, 8]}
        fov={70}
        rotation={[0, 0.3, 0]}
      />
      {/* <OrbitControls enableZoom={true} enableRotate={true} /> */}
      <Backdrop
        scale={[400, 120, 10]}
        rotation={[0, 0.1, 0]}
        // rotation={[0, 25, 0]}
        position={[10, 0, -20]}
        floor={10} // Stretches the floor segment, 0.25 by default
        segments={20} // Mesh-resolution, 20 by default
      >
        <meshStandardMaterial color="#fff" />
      </Backdrop>
      <Scroll>{blogGeneration}</Scroll>
    </>
  );
};
