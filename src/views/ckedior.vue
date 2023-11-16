<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script>
export default {
  // Đặt chiều cao mới ở đây,
  mounted() {
    // Import CKEditor từ tệp đã tải về
    const script = document.createElement("script");
    script.src = "../src/plugins/ckeditor.js"; // Thay đổi đường dẫn đến tệp JavaScript CKEditor
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      // Khởi tạo CKEditor sau khi tệp JavaScript đã tải
      ClassicEditor.create(document.querySelector("#editor"), {})
        .then((editor) => {
          console.log("Editor was initialized", editor);
        })
        .catch((error) => {
          console.error("There was an error initializing the editor", error);
        });
    };
    document.head.appendChild(script);
  },
};
</script>
<style>
.ck.ck-content:not(.ck-style-grid__button__preview) {
  /* Make sure all content containers have some min height to make them easier to locate. */
  min-height: 100px;
}
</style>