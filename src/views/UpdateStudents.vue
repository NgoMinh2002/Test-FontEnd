<template>
  <v-dialog v-model="dialog" persistent width="900px">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="elevated"
        dark
        color="primary"
        style="width: 120px !important"
      >
        Thêm
      </v-btn>
    </template>

    <v-sheet dense>
      <v-toolbar elevation="5" small height="200px" color="white">
        <v-toolbar-title class="text-center font-weight-bold">{{
          formTitle
        }}</v-toolbar-title>

        <v-btn icon="mdi-window-close" @click="dialog = false"></v-btn>
      </v-toolbar>
      <v-container class="pa-8">
        <v-card elevation="5">
          <v-card-title class="text-grey-darken-2">
            <span>Thông tin cá nhân</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSubmit">
                <v-row>
                  <v-col cols="12" sm="12">
                    <div>
                      <v-avatar rounded="0" size="120" class="rounded-lg">
                        <v-img
                          cover
                          class="rounded-lg"
                          v-if="hasImage"
                          :src="imageUrl"
                          width="100%"
                        ></v-img>
                        <v-icon v-else size="120">{{ defaultImage }}</v-icon>
                      </v-avatar>
                      <v-btn
                        dark
                        @click="toggleImage"
                        class="mt-9 mx-6 rounded-lg text-capitalize"
                        color="blue"
                      >
                        {{ hasImage ? "Thay đổi ảnh" : "Thêm ảnh" }}
                      </v-btn>
                      <input
                        type="file"
                        ref="fileInput"
                        @change="uploadImage"
                        accept="image/*"
                        style="display: none"
                      /></div
                  ></v-col>
                  <v-col cols="12" sm="6">
                    <div class="">
                      <span class="font-weight-medium">
                        <span class="text-red text-font">*</span>Tên khóa học
                      </span>
                    </div>

                    <v-text-field
                      single-line
                      hide-details
                      :counter="15"
                      v-bind="name"
                      name="name"
                      density="compact"
                      variant="outlined"
                      type="text"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="">
                      <span class="font-weight-medium">
                        <span class="text-red text-font">*</span>Thời gian học
                      </span>
                    </div>

                    <v-text-field
                      single-line
                      hide-details
                      v-bind="times"
                      name="times"
                      density="compact"
                      variant="outlined"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="">
                      <span class="font-weight-medium">
                        <span class="text-red text-font">* </span>Học phí
                      </span>
                    </div>

                    <v-text-field
                      single-line
                      hide-details
                      v-bind="money"
                      name="money"
                      density="compact"
                      variant="outlined"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="">
                      <span class="font-weight-medium">
                        <span class="text-red text-font">* </span>Số lượng môn
                      </span>
                    </div>

                    <v-text-field
                      single-line
                      hide-details
                      v-bind="subjects"
                      name="subjects"
                      density="compact"
                      variant="outlined"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col clos="12" sm="12">
                    <v-card-title class="text-grey-darken-2"
                      ><v-icon>mdi-book</v-icon> Nội dung khóa học</v-card-title
                    >
                  </v-col>
                  <v-col clos="12" sm="12">
                    <div>
                      <v-subtitle class="ml-6 mt-6 my-fonsezi">
                        Giới thiệu khóa học
                      </v-subtitle>
                      <v-card-text>
                        <ckediorVue></ckediorVue>
                      </v-card-text>
                    </div>
                  </v-col>
                  <v-col clos="12" sm="12">
                    <v-subtitle class="ml-6 mt-6 my-fonsezi">
                      Nội Dung khóa khọc
                    </v-subtitle>
                    <v-card-text>
                      <ckedior-vue-2></ckedior-vue-2>
                    </v-card-text>
                  </v-col>
                </v-row>
                <div class="text-center my-8">
                  <!-- Center-align the button -->
                  <v-btn type="submit" color="primary" class="mr-5">Lưu</v-btn>
                  <v-btn color="red" @click="dialog = false" class="ml-5"
                    >Hủy</v-btn
                  >
                  <!-- Your button here -->
                </div>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
<script>
import ckediorVue from "./ckedior.vue";
import ckediorVue2 from "./chedior2.vue";
export default {
  components: { ckediorVue, ckediorVue2 },
  data: () => {
    return {
      defaultImage: "mdi-image-plus-outline",
      hasImage: false,
      dialog: false,
      editedIndex: -1,
    };
  },
  methods: {
    toggleImage() {
      this.$refs.fileInput.click();
    },
    uploadImage(evnet) {
      const file = evnet.target.files[0];
      if (file && file.type.startsWith("image/")) {
        // Xử lý hình ảnh tại đây (ví dụ: tải lên máy chủ hoặc xử lý local)
        // Sau khi xử lý xong, cập nhật biến hasImage và imageUrl
        this.hasImage = true;
        this.imageUrl = URL.createObjectURL(file);
      } else {
        // Nếu không có hình ảnh được chọn hoặc tệp không phải là hình ảnh, không thực hiện gì cả
        // Đặt lại biến hasImage và imageUrl
        this.hasImage = false;
        this.imageUrl = null;
      }
    },
  },
};
</script>
<style scoped>
.my-fonsezi {
  font-size: 16px !important;
}
.no-border-textarea {
  border: none !important;
}
</style>