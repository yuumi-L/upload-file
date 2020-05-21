<template>
  <div id="app">
    <input type="file" id="file-input" />
    <button id="btn">上传</button>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    const btn = document.querySelector("#btn");
    btn.addEventListener("click", this.clickUpload);
  },
  methods: {
    clickUpload() {
      const fileBtn = document.querySelector("#file-input");
      console.log(fileBtn.files[0]);
      let totalSize = fileBtn.files[0].size;
      let file = fileBtn.files[0];
      const prePicesSize = 1024 * 1024;
      // 1024 * 1024 // 这是1M
      if (totalSize <= prePicesSize) {
        // 小于1M 不分片
        this.upload(file);
      } else {
        console.log(1);
        // 大于1M的分片 每片1M
        let start = 0; // 文件切割开始的位置
        let end; // 文件切割结束的位置
        let totalPieces = Math.ceil(totalSize / prePicesSize);

        let index = 0;
        let filePiece;
        let filePieceArr = [];
        while (index < totalPieces) {
          end = start + prePicesSize;
          filePiece = file.slice(start, end);
          // this.upload(filePiece, index);
          filePieceArr.push({
            file: filePieceArr,
            index: index
          });
          start += prePicesSize;
          index++;
        }
        this.upload(filePieceArr);
      }
    },
    upload(filePieceArrOrFile, index) {
      const formData = new FormData();
      if (typeof filePieceArrOrFile === "object") {
        for (let i = 0; i < filePieceArrOrFile.length; i++) {
          const filePiece = filePieceArrOrFile[i];
          console.log(filePiece);
          formData.append(`file${filePiece.index}`, filePiece.file);
        }
      } else {
        formData.append(`file`, filePieceArrOrFile);
      }
      this.$axios.post("/upload", formData).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style>
</style>
