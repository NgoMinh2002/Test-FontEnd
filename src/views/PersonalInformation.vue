<template>
  <v-container>
    <v-row justify="=center">
      <v-dialog v-model="dialog" persistent width="900px">
        <template v-slot:activator="{ props }">
          <v-list-item-title v-bind="props"
            >Personal Information</v-list-item-title
          >
        </template>
        <v-card dense>
          <v-toolbar elevation="1" small height="200px" color="white">
            <v-spacer></v-spacer>
            <v-btn icon="mdi-window-close" @click="dialog = false"></v-btn>
          </v-toolbar>
          <v-card-title>
            <span>Thông tin cá nhân</span>
          </v-card-title>
          <v-card-text>
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
                    <span>
                      <span class="text-red text-font">*</span>Họ tên:
                    </span>
                  </div>

                  <v-text-field
                    single-line
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
                    <span>
                      <span class="text-red text-font">*</span>Email:
                    </span>
                  </div>

                  <v-text-field
                    hide-details
                    name="email"
                    v-bind="email"
                    type="email"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <div class="">
                    <span>
                      <span class="text-red text-font">*</span>Ngày Sinh:
                    </span>
                  </div>
                  <v-dialog
                    single-line
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        single-line
                        v-model="formattedDates.value.value"
                        label="Ngày Sinh"
                        density="compact"
                        variant="outlined"
                        prepend-icon="mdi-calendar"
                        :error-messages="formattedDates.errorMessage.value"
                        :rules="[required]"
                        v-bind="props"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      @change="formattedDates.value.value = date"
                      @click:cancel="modal = false"
                      v-model="date"
                      scrollable
                    >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="">
                    <span>
                      <span class="text-red text-font">*</span>Số Phone:
                    </span>
                  </div>
                  <v-text-field
                    single-line
                    name="phone"
                    v-bind="phone"
                    type="tel"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" xs="12">
                  <v-card-title class="text-grey-darken-2"
                    ><v-icon>mdi-map-marker-radius-outline</v-icon
                    ><span right class="ml-4">Địa chỉ</span></v-card-title
                  >
                </v-col>

                <v-col cols="12" sm="6">
                  <div class="">
                    <span> Tỉnh / Thành Phố : </span>
                  </div>
                  <v-combobox
                    single-line
                    hide-details
                    v-bind:="citie"
                    :items="cities"
                    v-model="selectedCity"
                    density="compact"
                    variant="outlined"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="">
                    <span> Quận / Huyện : </span>
                  </div>
                  <v-combobox
                    single-line
                    hide-details
                    v-bind:="district"
                    v-model="selectedDistrict"
                    :items="districts"
                    density="compact"
                    variant="outlined"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="">
                    <span> Xã / Phường : </span>
                  </div>
                  <v-combobox
                    single-line
                    hide-details
                    v-bind:="ward"
                    v-model="selectedWard"
                    :items="wards"
                    density="compact"
                    variant="outlined"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="">
                    <span> Số Nhà: </span>
                  </div>
                  <v-text-field
                    single-line
                    hide-details
                    v-bind:="homess"
                    density="compact"
                    variant="outlined"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-card-title
                    single-line
                    hide-details
                    class="text-grey-darken-2"
                  >
                    <v-icon>mdi-book-variant</v-icon>
                    <span>Khóa học</span>
                  </v-card-title>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div>
                    <span>Chọn khóa học</span>
                  </div>
                  <v-combobox
                    single-line
                    hide-details
                    v-bind:="learn"
                    density="compact"
                    variant="outlined"
                    :items="[
                      'California',
                      'Colorado',
                      'Florida',
                      'Georgia',
                      'Texas',
                      'Wyoming',
                    ]"
                  ></v-combobox>
                </v-col>
              </v-row>
              <div class="text-center my-8">
                <!-- Center-align the button -->
                <v-btn type="submit" color="primary">Lưu Thông Tin</v-btn>

                <!-- Your button here -->
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog></v-row
    >
  </v-container>
</template>

<script>
import jsonData from "../plugins/data.json";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PersonalInformation",
  data: () => ({
    dialog: false,
    selectedCity: null,
    selectedDistrict: null,
    selectedWard: null,
    cities: jsonData.map((item) => item.Name),
    districts: [],
    wards: [],

    // modal: false,
    // date: null,
    defaultImage: "mdi-image-plus-outline",
    hasImage: false,
  }),
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
  watch: {
    // date(newDate) {
    //   if (newDate) {
    //     this.formattedDate = newDate.toLocaleDateString("vi-VN");
    //   } else {
    //     this.formattedDate = null;
    //   }
    // },
    selectedCity: function (newCity) {
      // Find the selected city's districts based on the selectedCity value
      const selectedCityData = jsonData.find((item) => item.Name === newCity);

      if (selectedCityData) {
        this.districts = selectedCityData.Districts.map(
          (district) => district.Name
        );
      } else {
        this.districts = [];
      }

      // Reset the selected district and ward
      this.selectedDistrict = null;
      this.selectedWard = null;
    },
    selectedDistrict: function (newDistrict) {
      // Find the selected district's wards based on the selectedDistrict value
      const selectedCityData = jsonData.find(
        (item) => item.Name === this.selectedCity
      );
      if (selectedCityData) {
        const selectedDistrictData = selectedCityData.Districts.find(
          (district) => district.Name === newDistrict
        );
        if (selectedDistrictData) {
          this.wards = selectedDistrictData.Wards.map((ward) => ward.Name);
        } else {
          this.wards = [];
        }
      } else {
        this.wards = [];
      }

      // Reset the selected ward
      this.selectedWard = null;
    },
  },
});
</script>
 <script setup >
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Cần nhập họ tên"),
  email: yup.string().email("Không phải là email").required("Cần nhập Email"),
  phone: yup.number().required("Cần nhập số Phone"),
  formattedDates: yup.string().required(),
  learn: yup.string(),
});
const { defineComponentBinds, handleSubmit } = useForm({
  validationSchema: schema,
});
const vuetifyConfig = (state) => ({
  props: {
    "error-messages": state.errors,
  },
});
const modal = ref(false);
const date = ref(new Date());
watch(date, (values) => {
  if (values !== null) {
    formattedDates.value.value = values.toLocaleDateString("vi-VN");
  } else {
    formattedDates.value.value = null;
  }
});

const citie = defineComponentBinds("citie", vuetifyConfig);
const district = defineComponentBinds("distrct", vuetifyConfig);
const ward = defineComponentBinds("weard", vuetifyConfig);
const learn = defineComponentBinds("learn", vuetifyConfig);
const name = defineComponentBinds("name", vuetifyConfig);
const email = defineComponentBinds("email", vuetifyConfig);
const formattedDates = useField("formattedDates");
const phone = defineComponentBinds("phone", vuetifyConfig);
const homess = defineComponentBinds("hshee", vuetifyConfig);
const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
});
</script>