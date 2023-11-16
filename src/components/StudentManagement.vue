<template>
  <v-container>
    <!--  tạo Thành phần  v-breadcrumbs được sử dụng làm công cụ trợ giúp điều hướng và phân cấp cho các trang. -->
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-card-title>Quản lý học viên</v-card-title>
    <!--Tạo Data-table -->
    <v-sheet class="width-auto conatainer" elevation="3">
      <v-conatainer class="pa-12">
        <v-data-table
          wrap
          rows
          class="pa-12"
          :items-per-page="5"
          :search="search"
          :headers="headers"
          :items="desserts"
          :sort-by="[{ key: 'name', order: 'asc' }]"
        >
          <template v-slot:top>
            <v-toolbar density="compact" color="white">
              <v-spacer></v-spacer>
              <div
                class="d-flex justify-space-between"
                style="width: 500px !important"
              >
                <v-text-field
                  class="mr-6"
                  :loading="loading"
                  density="compact"
                  variant="solo"
                  label="Search"
                  append-inner-icon="mdi-magnify"
                  single-line
                  v-model="search"
                  hide-details
                ></v-text-field>
              </div>
              <!-- Tạo Nút Btn Them Bằng Dailog -->
              <v-dialog v-model="dialog" persistent width="900px">
                <template class="" v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="elevated"
                    dark
                    color="green"
                    style="width: 120px !important"
                  >
                    Thêm
                  </v-btn>
                </template>
                <v-sheet dense flat>
                  <!-- tạo formtitle và nút đóng diaglog -->
                  <v-toolbar elevation="5" small height="200px" color="white">
                    <v-toolbar-title class="text-center font-weight-bold">{{
                      formTitle
                    }}</v-toolbar-title>

                    <v-btn
                      icon="mdi-window-close"
                      @click="dialog = false"
                    ></v-btn>
                  </v-toolbar>
                  <v-container class="pa-8">
                    <v-card elevation="5">
                      <v-card-title class="text-grey-darken-2">
                        <v-icon class="mr-4">mdi-account</v-icon>
                        <span>Thông tin cá nhân</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <!-- Tạo from thông tin -->
                          <v-form ref="form" @submit.prevent="onSubmit">
                            <v-row>
                              <v-col cols="12" sm="12">
                                <div>
                                  <v-avatar
                                    rounded="0"
                                    size="120"
                                    class="rounded-lg"
                                  >
                                    <v-img
                                      cover
                                      class="rounded-lg"
                                      v-if="hasImage"
                                      :src="imageUrl"
                                      width="100%"
                                    ></v-img>
                                    <v-icon v-else size="120">{{
                                      defaultImage
                                    }}</v-icon>
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
                                  />
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <span class="font-weight-medium mb-2">
                                  <span class="text-red text-font">* </span>
                                  Họ tên:
                                </span>

                                <v-text-field
                                  :rules="[(v) => !!v || 'Bạn phải nhập tên']"
                                  required
                                  single-line
                                  v-model="editedItem.name"
                                  density="compact"
                                  variant="outlined"
                                  type="text"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <span class="font-weight-medium mb-2">
                                  <span class="text-red text-font">*</span
                                  >Email:
                                </span>

                                <v-text-field
                                  :rules="[
                                    (v) => !!v || 'Bạn phải nhập email',
                                    (v) =>
                                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                                        v
                                      ) || 'Email không hợp lệ',
                                  ]"
                                  single-line
                                  type="email"
                                  density="compact"
                                  variant="outlined"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <span class="font-weight-medium mb-2">
                                  <span class="text-red text-font">* </span>Ngày
                                  sinh:
                                </span>
                                <v-text-field
                                  :rules="[
                                    (v) => !!v || 'Bạn phải nhập ngày sinh',
                                  ]"
                                  single-line
                                  v-model="editedItem.birthday"
                                  density="compact"
                                  variant="outlined"
                                  type="date"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <span class="font-weight-medium mb-2">
                                  <span class="text-red text-font">* </span>Số
                                  Phone:
                                </span>
                                <v-text-field
                                  :rules="[
                                    (v) => !!v || 'Bạn phải số điện thoại',
                                  ]"
                                  single-line
                                  type="tel"
                                  v-model="editedItem.phone"
                                  density="compact"
                                  variant="outlined"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12" xs="12">
                                <v-card-title class="text-grey-darken-2"
                                  ><v-icon>mdi-map-marker-radius-outline</v-icon
                                  ><span right class="ml-4"
                                    >Địa chỉ</span
                                  ></v-card-title
                                >
                              </v-col>
                              <v-col cols="12" sm="6">
                                <span class="font-weight-medium mb-2">
                                  Tỉnh / Thành Phố :
                                </span>
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
                                <span class="font-weight-medium mb-2">
                                  Quận / Huyện :
                                </span>
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
                                <span class="font-weight-medium mb-2">
                                  Xã / Phường :
                                </span>
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
                                <span class="font-weight-medium mb-2">
                                  Số Nhà:
                                </span>

                                <v-text-field
                                  single-line
                                  hide-details
                                  density="compact"
                                  variant="outlined"
                                  type="text"
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
                                <span class="font-weight-medium mb-2"
                                  >Chọn khóa học</span
                                >
                                <v-combobox
                                  single-line
                                  hide-details
                                  v-model="editedItem.Coursename"
                                  density="compact"
                                  variant="outlined"
                                  :items="[
                                    'FontEnd',
                                    'BackEnd',
                                    'Windows',
                                    'FullTack',
                                  ]"
                                ></v-combobox>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <span class="font-weight-medium mb-2">
                                  Ngày Đăng ký
                                </span>
                                <v-text-field
                                  v-model="editedItem.registrationdate"
                                  single-line
                                  density="compact"
                                  variant="outlined"
                                  type="date"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <span class="font-weight-medium mb-2">
                                  Ngày bắt đầu
                                </span>
                                <v-text-field
                                  single-line
                                  density="compact"
                                  variant="outlined"
                                  type="date"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <span class="font-weight-medium mb-2">
                                  Ngày kết thúc
                                </span>
                                <v-text-field
                                  single-line
                                  density="compact"
                                  variant="outlined"
                                  type="date"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <span class="font-weight-medium mb-2"
                                  >Tình trạng học</span
                                >
                                <v-combobox
                                  v-model="editedItem.status"
                                  single-line
                                  hide-details
                                  density="compact"
                                  variant="outlined"
                                  :items="[
                                    'Đang học chính',
                                    'Chờ duyệt',
                                    'Học xong',
                                    'Chưa hoàn thành',
                                  ]"
                                ></v-combobox>
                              </v-col>
                            </v-row>
                            <div class="text-center my-8">
                              <!-- Center-align the button -->
                              <v-btn
                                type="submit"
                                @click="serve"
                                color="primary"
                                class="mr-5"
                                >Lưu</v-btn
                              >
                              <v-btn
                                color="red"
                                @click="dialog = false"
                                class="ml-5"
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
              <v-dialog v-model="dialogDelete" max-width="400px">
                <v-container>
                  <v-row>
                    <v-sheet class="mx-auto p-4" width="400px">
                      <v-card-title>
                        <v-icon
                          size="28"
                          icon="mdi-alpha-i-circle-outline"
                          color="error"
                        ></v-icon>
                        Bạn có chắc muốn xóa không
                      </v-card-title>

                      <v-subtitle class="ml-12">
                        (Hãy cân nhắc trước khi xóa)
                      </v-subtitle>

                      <v-card-actions class="mt-6">
                        <v-spacer></v-spacer>
                        <v-btn
                          variant="elevated"
                          dark
                          class="mr-4"
                          color="indigo-darken-3"
                          flat
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-btn
                          dark
                          variant="elevated"
                          color="red"
                          flat
                          @click="closeDelete"
                          >Cancel</v-btn
                        >
                      </v-card-actions>
                    </v-sheet>
                  </v-row>
                </v-container>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.status="{ item }">
            <div :class="getColor(item.raw.status)">
              {{ item.raw.status }}
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              size="x-large"
              class="me-2 text-blue"
              @click="editItem(item.raw)"
            >
              mdi-pencil-outline
            </v-icon>
            <v-icon
              size="x-large"
              class="text-red"
              @click="deleteItem(item.raw)"
            >
              mdi-delete-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-conatainer>
    </v-sheet>
  </v-container>
</template>
<script>
import jsonData from "../plugins/data.json";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false, //  thay đổi,hoạt động của hộp thoại "Mở": "Đóng"
    editedIndex: -1, // lưu dữ vị trí để thay đổi trạng thái formTitle
    search: "", // tìm kiếm
    defaultImage: "mdi-image-plus-outline", // icon hình ảnh
    hasImage: false, // thay đổi tên trạng thái
    selectedCity: null,
    selectedDistrict: null,
    selectedWard: null,
    cities: jsonData.map((item) => item.Name),
    districts: [],
    wards: [],
    items: [
      {
        title: "Home",
        disabled: false,
        to: "/Home",
      },
      {
        title: "Quản lý học viên",
        disabled: false,
        to: "/StudentManagement",
      },
    ], // giá trị của v-breadcrumbs
    headers: [
      { title: "Học Tên", align: "start", key: "name" },
      { title: "Ngày sinh", key: "birthday" },
      { title: "Ngày đăng ký", key: "registrationdate" },
      { title: "Số điện thoại", key: "phone" },
      { title: "Tên khóa học", key: "Coursename" },
      { title: "Tình trạng học", key: "status" },
      { title: "Thao Tác", key: "actions", sortable: false },
    ],
    desserts: [],
    editedItem: {
      name: "",
      birthday: "",
      registrationdate: "",
      phone: "",
      Coursename: "",
      status: "",
    },
    defaultItem: {
      name: "",
      birthday: "",
      registrationdate: "",
      phone: "",
      Coursename: "",
      status: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm học viên" : "Cập nhật học viên";
    }, // thay dổi formTitle
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
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
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          name: "cell",
          birthday: "20/12/2002",
          registrationdate: "20/10/2023",
          phone: "0394357353",
          Coursename: "FontEnd",
          status: "Đang học",
        },
        {
          name: "cell",
          birthday: "20/11/2002",
          registrationdate: "12/10/2023",
          phone: "03943573232",
          Coursename: "FontEnd",
          status: "Chờ duyệt",
        },
        {
          name: "cell",
          birthday: "20/11/2002",
          registrationdate: "12/10/2023",
          phone: "03943573232",
          Coursename: "FontEnd",
          status: "Chưa hoàn thành",
        },
        {
          name: "cell",
          birthday: "20/11/2002",
          registrationdate: "12/10/2023",
          phone: "03943573232",
          Coursename: "FontEnd",
          status: "Học xong",
        },
      ];
    },
    getColor(status) {
      if (status === "Đang học") return "text-green-accent-4";
      else if (status === "Chờ duyệt") return "text-grey-darken-1";
      else if (status === "Chưa hoàn thành") return "text-red";
      else if (status === "Học xong") return "text-blue-accent-4";
    },
    //'',
    // 'Chờ duyệt',
    // 'Học xong',
    // 'Chưa hoàn thành'
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
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async onSubmit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (this.editedIndex > -1) {
          // Editing an existing item
          this.desserts[this.editedIndex] = { ...this.editedItem };
        } else {
          // Adding a new item
          this.desserts.push({ ...this.editedItem });
        }
        this.dialog = false; // Close the dialog
        this.editedItem = {};
      }

      // Clear the form
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.formTitle = "Cập nhật học viene"; // Change form title when editing
      this.dialog = true; // Open the dialog
    },
  },
};
</script>