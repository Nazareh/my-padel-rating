<template>
  <MatchUploadForm />
</template>

<script>
import MatchUploadForm from "./components/MatchUploadForm.vue";

export default {
  name: "App",
  components: {
    MatchUploadForm,
  },
  publicPath: "./match-register",
  assetsDir: "match-register",
};
</script>
