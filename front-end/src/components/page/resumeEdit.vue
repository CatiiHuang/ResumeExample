<template>
  <div class="big_wrap">
    <div class="wrap">
      <person :userId="userId"></person>
      <advantage :userId="userId"></advantage>
      <position :userId="userId"></position>
      <internship :userId="userId"></internship>
      <education :userId="userId"></education>
      <language :userId="userId"></language>
      <other :userId="userId"></other>
    </div>
  </div>
</template>

<script>
import person from "./resumeEdit/person";
import advantage from "./resumeEdit/advantage";
import position from "./resumeEdit/position";
import internship from "./resumeEdit/internship";
import education from "./resumeEdit/education";
import other from "./resumeEdit/other";
import language from "./resumeEdit/language";
export default {
  name: "resumeEdit",
  data() {
    return {
      userId: "",
    };
  },
  created() {
    this.userId = 1;
  },
  components: {
    person,
    advantage,
    position,
    internship,
    education,
    other,
    language,
  },
};
</script>

<style scoped lang="less">
.big_wrap {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  background-color: #ddd;
  @media screen and (max-width: 1000px) {
    .wrap {
      width: 100% !important;
      padding: 30px 0;
    }
  }
  .wrap {
    width: 900px;
    background-color: #fff;
    padding: 30px 0;
    margin: 50px auto;
  }
}
</style>
