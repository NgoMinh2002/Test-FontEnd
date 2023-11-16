<template>
  <div>
    <v-select
      v-model="selectedCity"
      :items="cities"
      label="Select City"
    ></v-select>

    <v-select
      v-model="selectedDistrict"
      :items="districts"
      label="Select District"
    ></v-select>

    <v-select
      v-model="selectedWard"
      :items="wards"
      label="Select Ward"
    ></v-select>
  </div>
</template>

<script>
import jsonData from "./data.json";

export default {
  data() {
    return {
      drawer: false,
      selectedCity: null,
      selectedDistrict: null,
      selectedWard: null,
      cities: jsonData.map((item) => item.Name),
      districts: [],
      wards: [],
    };
  },
  watch: {
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
};
</script>
