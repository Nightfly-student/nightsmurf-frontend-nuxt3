<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

async function gsapRotation() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    "#header_title",
    {
      opacity: 0,
      x: "-100%",
    },
    {
      duration: 1.5,
      opacity: 1,
      x: 0,
    }
  );
  gsap.fromTo(
    "#header_text",
    {
      opacity: 0,
      x: "-100%",
    },
    {
      duration: 1.5,
      opacity: 1,
      x: 0,
      ease: "power3.inOut",
      delay: 0.5,
    }
  );
  gsap.fromTo(
    "#header_button",
    {
      opacity: 0,
      y: "100%",
    },
    {
      duration: 1.5,
      opacity: 1,
      y: 0,
      delay: 1.3,
      ease: "power3.inOut",
      stagger: 0.1,
    }
  );
  gsap.fromTo(
    "#header_image",
    {
      y: "-=15",
      ease: "sine",
    },
    {
      y: "+=15",
      ease: "sine",
      repeat: -1,
      yoyo: true,
      duration: 0.8,
    }
  );
}

interface HeaderProps {
  title: string;
  body: string;
  button: boolean;
  imageTitle: string;
  imageAlt: string;
  trustpilot: boolean;
}
const props = defineProps<HeaderProps>();

onMounted(() => {
  gsapRotation();
});
</script>

<template>
  <header class="text-light">
    <div class="container-xl">
      <div class="row">
        <div class="col-xl-6 col-sm-12 col-12">
          <h1 id="header_title" class="pt-3">
            {{ title }}
          </h1>
          <p id="header_text" class="">
            {{ body }}
          </p>
          <a
            v-if="button"
            id="header_button"
            href="#shop"
            role="button"
            class="btn btn-primary p-2 px-3 fs-5"
          >
            Buy Unranked Smurf
          </a>
        </div>
        <div class="col-sm-6 col-0 d-none d-xl-block">
          <img
            id="header_image"
            class="img-fluid w-full"
            src="/assets/images/yi_header.png"
            :alt="imageAlt"
            :title="imageTitle"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style>
header {
  background-color: #121212;
  padding-top: 100px;
  padding-bottom: 150px;
}
header h1 {
  font-size: 50px;
}
header p {
  color: gainsboro;
}
.header-absolute {
  position: absolute;
  top: 0;
  height: 400px;
}
.content-wrapper {
  height: 100%;
  z-index: 2;
}
.divider-top {
  margin-top: 100px;
}
.box-design {
  background: #161616;
  border-radius: 5px;
  padding: 15px;
}
@media (max-width: 1199px) {
  header {
    text-align: center;
  }
}
@media (max-width: 540px) {
  header h1 {
    font-size: 40px;
  }
}
</style>
