<script lang="ts" setup>
 const onSelect = () => {
    // this.$router.push({ query: { champion: value } });
 }
</script>


<template>
  <div>
    <div id="carouselPopular" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="card m-auto shadow">
            <img
              src="https://res.cloudinary.com/droomsocial/image/upload/v1659094305/twitch_4_qsn9ty.jpg"
              class="card-img-top img-size-pos"
              alt="League Of Legends Twitch Image"
              title="Gangster Twitch"
            />
            <div class="py-3">
              <div class="row justify-content-center align-items-center p-2">
                <div class="col-2">
                  <img
                    class="round-champ mt-2 mx-2"
                    src="https://res.cloudinary.com/droomsocial/image/upload/v1659094304/Twitch_m07byw.png"
                    alt="Twitch Rounded Image"
                    title="Twitch Round"
                  />
                </div>
                <div class="col-10">
                  <h5 class="card-title pt-3 text-center">Gangster Twitch</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="card m-auto shadow">
            <img
              src="https://res.cloudinary.com/droomsocial/image/upload/v1659094303/Kassadin_5_csj3kw.jpg"
              class="card-img-top img-size-pos"
              alt="League Of Legends Kassadin Image"
              title="Cosmic Reaver Kassadin"
            />
            <div class="py-3">
              <div class="row justify-content-center align-items-center p-2">
                <div class="col-2">
                  <img
                    class="round-champ mt-2 mx-2"
                    src="https://res.cloudinary.com/droomsocial/image/upload/v1659094302/Kassadin_tuvczm.png"
                    alt="Kassadin Rounded Image"
                    title="Kassadin Round"
                  />
                </div>
                <div class="col-10">
                  <h5 class="card-title pt-3 text-center">
                    Cosmic Reaver Kassadin
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="card m-auto shadow">
            <img
              src="https://res.cloudinary.com/droomsocial/image/upload/v1659094303/Nidalee_9_bqaiah.jpg"
              class="card-img-top img-size-pos"
              alt="League Of Legends Nidalee Image"
              title="Super Galaxy Nidalee"
            />
            <div class="py-3">
              <div class="row justify-content-center align-items-center p-2">
                <div class="col-2">
                  <img
                    class="round-champ mt-2 mx-2"
                    src="https://res.cloudinary.com/droomsocial/image/upload/v1659094303/Nidalee_frzfb7.png"
                    alt="Nidalee Rounded Image"
                    title="Nidalee Round"
                  />
                </div>
                <div class="col-10">
                  <h5 class="card-title pt-3 text-center">
                    Super Galaxy Nidalee
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselPopular"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselPopular"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
  width: 300px;
}
.img-size-pos {
  height: 300px;
  width: auto;
  margin: 5px;
  object-fit: cover;
  object-position: top;
}
.button-buy-now {
  margin: auto;
  margin-top: -50px;
  margin-left: 10px;
  margin-right: 10px;
  width: auto;
}
.round-champ {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>
