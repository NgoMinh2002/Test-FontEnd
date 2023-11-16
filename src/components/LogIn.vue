<template>
  <v-app app>
    <v-app-bar app elevation="2" outlined dense shrink flat>
      <v-container>
        <v-row class="text-light-blue-darken-4">
          <div class="d-flex align-center">
            <v-img
              alt=""
              class="shrink mr-2"
              contain
              src="@/assets/logo.svg"
              transition="scale-transition"
              width="60"
            />

            <span class="my-custom-text">Lotus Academy</span>
          </div>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container xs="12">
        <v-row class="pa-6 mx-auto" justify="space-around">
          <v-sheet width="400" class="text-center">
            <span
              class="my-custom-text-size text-uppercase grey--text text--darken-1"
              >Đăng Nhập
              <v-divider color="grey-darken-2"> </v-divider>
            </span>
          </v-sheet>
        </v-row>
        <v-row justify="space-around" class="mx-auto pa-12">
          <v-sheet rounded color="white" elevation="2" width="400">
            <v-container>
              <v-form @submit.prevent="onSubmit">
                <div class="mb-3 mt-3 form-group">
                  <label for="name">Tên Đăng Nhâp:</label>
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    :counter="10"
                    class="mt-2"
                    id="name"
                    v-bind="name"
                    placeholder="Enter name"
                    name="name"
                  />
                </div>
                <div class="mb-3 mt-4 form-group">
                  <label for="password">Mật Khẩu :</label>
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    :type="showPassword ? 'text' : 'password'"
                    class="mt-2"
                    id="password"
                    placeholder="Enter Password"
                    name="Password"
                    v-bind="password"
                    @click:append="togglePasswordVisibility"
                  />
                  <span>{{ errors }}</span>
                  <v-switch
                    color="primary"
                    hide-details
                    v-model="showPassword"
                    label="Hiển thị mật khẩu"
                  ></v-switch>
                  <!-- Hiển thị thông báo lỗi -->
                </div>
                <v-btn
                  rounded="lg"
                  block
                  color="primary form-group"
                  class="mr-6"
                  type="submit"
                  elevation="1"
                >
                  Đăng nhập
                </v-btn>
              </v-form>
            </v-container>
          </v-sheet>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { defineComponent } from "vue";
// import { useForm } from "vee-validate";
// import * as yup from "yup";
export default defineComponent({
  name: "LogIn",
  data() {
    return {
      name: "",
      showPassword: false, // Sử dụng để bật/tắt hiển thị mật khẩu
      password: "", // Dữ liệu nhập mật khẩu
    };
  },
  togglePasswordVisibility() {
    // Đảo ngược giá trị của showPassword khi người dùng nhấn vào biểu tượng
    this.showPassword = !this.showPassword;
  },

  setup() {},
});
</script>
// <script setup>
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
const router = useRouter();
const schema = yup.object({
  name: yup.string().required("Tên đăng nhập không thể bỏ trống").label("Name"),

  password: yup
    .string()
    .required("Mật khẩu không thể bỏ trống")
    .label("PassWord"),
});

const { defineComponentBinds, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

// Refer to the docs for how to make advanced validation behaviors with dynamic configs
// TODO: Add link
const vuetifyConfig = (state) => ({
  props: {
    "error-messages": state.errors,
  },
});

const name = defineComponentBinds("name", vuetifyConfig);

const password = defineComponentBinds("password", vuetifyConfig);

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
  const isLoggedIn = true;

  if (isLoggedIn) {
    // Redirect to the home page
    router.push({ path: "Home" });
  } else {
    // Handle login failure
  }
});
</script>
<style scoped>
.my-custom-text-size {
  font-size: 30px;
  font-weight: bold;
}
.my-custom-text {
  font-size: 20px;
}
</style>
