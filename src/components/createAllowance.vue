<template>
  <div class="">
    <h4 style="font-weight: bolder" class="pa-5">Allowances Name</h4>
    <v-card>
      <v-row>
        <v-col cols="12">
          <div class="_header px-10 pt-5">
            <h4 style="font-size: 18px">
              Manage Allowance Names - Approved Listing
            </h4>
            <div>
              <v-btn
                style="font-size: 13px; background-color: #17517e; color: #fff"
                elevation="0"
                @click="dialog = true"
                >Create Allowance</v-btn
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12">
          <div>
            <v-card elevation="0">
              <v-card-title class="px-10">
                <v-row>
                  <v-col cols="12">
                    <!-- <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                      outlined
                    ></v-text-field> -->
                    <div
                      class="py-3 px-7 _flex-space-btw rounded"
                      style="
                        background: #fee9e9;
                        color: #dd5f5f;
                        font-size: 13px;"
                    >
                      <span>
                        <img src="../assets/alert.png" class="mr-3" alt="" />
                        Info! Only Approved Records Display Here.
                      </span>
                      <span>
                        <a href="#">
                          <img src="../assets/close.png" alt="" />
                        </a>
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-data-table
                :headers="headers"
                class="table-striped"
                :items="items"
              >
                <template v-slot:item.status="{ item }">
                  <v-btn
                    style="color: red; text-transform: capitalize"
                    text
                    v-if="item.status"
                    @click="allowance_status(item)"
                    >Dactivate</v-btn
                  >
                  <v-btn
                    v-else
                    style="color: green; text-transform: capitalize"
                    text
                    @click="allowance_status(item)"
                    >Activate</v-btn
                  >
                </template>

                <template v-slot:item.more="{ item }">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" text v-bind="attrs" v-on="on">
                     <img src="../../public/Vector.svg" alt="">
                      </v-btn>
                    </template>
                    <v-list>
                      <v-btn text block @click="edit(item)">
                        <v-list-item>Edit</v-list-item>
                      </v-btn>
                      <v-btn text block @click="deleteAllowance(item)">
                        <v-list-item>Delete</v-list-item>
                      </v-btn>
                    </v-list>
                  </v-menu>
                </template>
              </v-data-table>
            </v-card>
            <!-- <div class="my-16">
              <h4 class="no-data">No available allowance name</h4>
            </div> -->
            <div
              v-if="items.length < 1"
              class="my-5"
              style="text-align: center"
            >
              <v-btn
                style="font-size: 13px; background-color: #17517e; color: #fff"
                elevation="0"
                @click="dialog = true"
                >Create Allowance</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog2" width="400">
      <v-card class="text-center" style="text-align: center">
        <div
          class="text-h6 text-center pa-4"
          style="background-color: #f2f9ff; color: #17517e"
        >
          Create Allowance
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-card-text
            style="font-size: 16px; font-weight: bolder"
            class="mb-3"
            densed
          >
            Create a new allowance to a regime
          </v-card-text>
          <v-form>
            <v-select
              v-model="allowance_edit"
              :items="Allowanceitems"
              label="Allowance Name"
              outlined
            ></v-select>
            <v-select
              v-model="salary_edit"
              :items="Salaryitems"
              label="Salary Scale Regime"
              outlined
            ></v-select>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="editAllowance"
            >
              Edit
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" width="400">
      <v-card class="text-center" style="text-align: center">
        <div
          class="text-h6 text-center pa-4"
          style="background-color: #f2f9ff; color: #17517e"
        >
          Create Allowance
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-card-text
            style="font-size: 16px; font-weight: bolder"
            class="mb-3"
            densed
          >
            Create a new allowance to a regime
          </v-card-text>
          <v-form>
            <v-select
              v-model="allowance_name"
              :items="Allowanceitems"
              label="Allowance Name"
              outlined
            ></v-select>
            <v-select
              v-model="salary_regime"
              :items="Salaryitems"
              label="Salary Scale Regime"
              outlined
            ></v-select>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="createAllowance"
            >
              Submit
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      salary_edit: "",
      allowance_edit: "",
      allowance_name: "",
      salary_regime: "",
      allowance: "",
      allowanceCode: "",
      regimeCode: "",
      tabledata: false,
      dialog: false,
      dialog2: false,
      Allowanceitems: [],
      Salaryitems: [],
      headers: [
        {
          text: "Action",
          value: "more",
        },
        {
          text: "Allowance Name",
          value: "allowance_name",
        },
        {
          text: "Salary Scale Regime",
          value: "salreg",
        },
        {
          text: "Institution",
          value: "institu",
        },
        {
          text: "Entered By",
          //allowaence name, salary scale regime, institution, Entered by, entered on, status, more
          value: "enterby",
        },
        {
          text: "Entered On",
          value: "enteron",
        },
        {
          text: "Status",
          value: "status",
        },
      ],
      items: [],
      allowances: [],
      regimes: [],
      allowanceItem: [],
    };
  },

  computed: {
    ...mapGetters({
      jwt: "getJwt",
      instu_code: "getInstuCode",
       baseURL:"baseURL"
    }),
  },

  beforeMount() {
    this.populateAllowanceName();
    this.populateAlowance();
    // this.populateSalarayRegime();
  },

  watch: {
    //Track Allowance Code
    allowance_name(val) {
      const allowance = this.allowances.find((el) => el.allowance_name === val);
      this.allowanceCode = allowance.allowance_code;
    },
    //Track Salary Code
    salary_regime(val) {
      const regime = this.regimes.find((el) => el.regime_name === val);
      this.regimeCode = regime.regime_code;
    },
  },

  methods: {
    edit(item) {
      this.dialog2 = true;
      this.allowance_edit = item.allowance_name;
      this.salary_edit = item.salreg;
      this.allowanceItem = item;
    },
    // async populateSalarayRegime() {
    //   try {
    //     const res = await axios({
    //       headers: {
    //         Authorization: `Bearer ${this.jwt}`,
    //       },
    //       method: "get",
    //       url: `http://192.168.88.17:2120/salary_regime?institution_code=${this.instu_code}`,
    //     });

    //     console.log("Institution Code", res);

    //     res.data.response.message.regimes.forEach((el) => {
    //       this.Salaryitems.push(el.regime_name);
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    //Fetch Populate Allowance Name and Salary Regime Select Field
    async populateAllowanceName() {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
          method: "GET",
          url: `${this.baseURL}/allowance?institution_code=${this.instu_code}`,
        });
        // console.log("Allowance Name", res);
        this.allowances = res.data.response.message.allowances;
        this.regimes = res.data.response.message.regimes;
        // console.log("TEST HERE", this.allowances, this.regimes);
        res.data.response.message.regimes.forEach((el) => {
          this.Salaryitems.push(el.regime_name);
        });

        res.data.response.message.allowances.forEach((el) => {
          this.Allowanceitems.push(el.allowance_name);
        });
      } catch (error) {
        console.log(error);
      }
    },

    //Populate allowance Table
    async populateAlowance() {
      try {
        // console.log("HERE");
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
          method: "GET",
          url: `${this.baseURL}/allowance_regime?institution_code=${this.instu_code}`,
        });

        console.log("ALLOWANCES", res);

        if (res.data.response.code == "00") {
          res.data.response.message.data.forEach((el) => {
            this.items.push({
              allowance_name: el.allowance_data.allowance_name,
              salreg: el.regime_data.regime_name,
              institu: el.institution,
              enterby: el.entered_by,
              enteron: el.date.split("T")[0],
              status: el.status,
              regime_code: el.regime_code,
              allow_code: el.allowance_data.allowance_code,
              allow_regime_code: el.allowance_regime_code,
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Activate Dactivate Allowance
    async allowance_status(item) {
      console.log(item);
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
          method: "patch",
          url: `${this.baseURL}/allowance_regime`,

          data: {
            institution_code: this.instu_code,
            allowance_regime_code: item.allow_regime_code,
            active: !item.status,
          },
        });
        console.log(res);
        //Check status
        if (res.data.response.code == "00") {
          const row = this.items.findIndex(
            (el) => el.allow_code === item.allow_code
          );

          this.items[row].status = !item.status;

          Swal.fire({
            icon: "success",
            title: "Successful",
            width: 400,
          });
        } else if (res.data.response.code == "E400") {
          Swal.fire({
            icon: "error",
            title: "Allowance Name not Deactivated",
            width: 400,
          });
        } else if (res.data.response.code == "E401") {
          Swal.fire({
            icon: "error",
            title: "Allowance Name not Activated",
            width: 400,
          });
        }
        // console.log(res);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Encounted",
          width: 400,
        });
        console.log(error);
      }
    },

    //Create Allowance(- Link Allowances to Regimes - )
    async createAllowance() {
      // console.log("TEST HERE", this.allowanceCode, this.regimeCode);
      if (this.allowance_name == "" || this.salary_regime == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          width: 400,
        });
      } else {
        try {
          const res = await axios({
            headers: {
              Authorization: `Bearer ${this.jwt}`,
            },
            method: "post",
            url: `${this.baseURL}/allowance_regime`,
            data: {
              institution_code: this.instu_code,
              regime_code: this.regimeCode,
              allowance_code: this.allowanceCode,
              entered_by: "Veripay Integrated",
            },
          });

          // Check for Status Code
          // console.log(res);
          if (res.data.response.code === "00") {
            this.allowance_name = "";
            this.salary_regime = "";
            const data = res.data.response.message.data;
            this.items.push({
              allowance_name: data.allowance_name,
              salreg: data.regime_name,
              institu: data.institution,
              enterby: data.entered_by,
              enteron: data.date.split("T")[0],
              status: data.status,
              allow_code: el.allowance_code,
              regime_code: el.regime_code,
              allow_regime_code: el.allowance_regime_code,
            });

            this.dialog = false;

            Swal.fire({
              icon: "success",
              title: "Created",
              text: "Allowance Name Created",
              width: 400,
            });
          } else if (res.data.response.code == "E202") {
            Swal.fire({
              icon: "info",
              title: "Oops...",
              text: "Allowance is already assigned to Salary regime",
              width: 400,
            });
          } else if (res.data.response.code == "E203") {
            Swal.fire({
              icon: "info",
              title: "Oops...",
              text: "Allowance allocation not successfu",
              width: 400,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Allowance Not Created",
              width: 400,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Allowance Not Created",
            width: 400,
          });
          console.log(error);
        }
      }
      this.dialog = false;
    },

    //Edit Allowance
    async editAllowance() {
      console.log(this.allowanceItem);
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
          method: "put",
          url: `${this.baseURL}/allowance_regime`,

          data: {
            institution_code: this.instu_code,
            entered_by: this.allowanceItem.enterby,
            regime_code: this.allowanceItem.regime_code,
            allowance_regime_code: this.allowanceItem.allow_regime_code,
            allowance_name: this.allowance_edit,
            allowance_code: this.allowanceItem.allow_code,
          },
        });

        if (res.data.response.code == "00") {
          const row = this.items.findIndex(
            (el) => el.allow_code === this.allowanceItem.allow_code
          );

          this.items[row].allowance_name = this.allowance_edit;
          this.items[row].salreg = this.salary_edit;

          this.dialogEdit = false;
          return Swal.fire({
            icon: "success",
            text: "Edited Successfully",
            title: "Successful",
            width: 400,
          });
        } else if (res.data.response.code == "E300") {
          Swal.fire({
            icon: "error",
            text: "Allowance Name Already Exist",
            title: "Oops..",
            width: 400,
          });
        } else if (res.data.response.code == "E301") {
          Swal.fire({
            icon: "error",
            text: "Allowance name didn’t update!",
            title: "Oops..",
            width: 400,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Error Occured while Editing Allowance Name",
            title: "Oops..",
            width: 400,
          });
        }
        console.log("Edit Allowance", res);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
          title: "Oops!!",
          width: 400,
        });
      }
    },

    //Delete Allowance
    async deleteAllowance(item) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
          // - {‘institution_code’:’’, ‘allowance_code’:’’}
          method: "delete",
          url: `${this.baseURL}/allowance_regime`,
          data: {
            institution_code: this.instu_code,
            allowance_regime_code: item.allow_regime_code,
          },
        });
        // console.log(res);
        if (res.data.response.code == "00") {
          const row = this.items.findIndex(
            (el) => el.allow_code === item.allow_code
          );

          this.items.splice(row, 1);

          return Swal.fire({
            icon: "success",
            text: "Allowance deleted successfully!",
            title: "Successful",
            width: 400,
          });
        } else {
          return Swal.fire({
            icon: "error",
            title: "Allowance not deleted successfully!",
            width: 400,
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
          title: "Oops!!",
        });
      }
    },
  },
};
</script>

<style>
.add_button {
  font-size: 13px;
  word-spacing: 1px;
  align-items: center;
  justify-content: center;
  background-color: #f2f9ff;
  color: rgba(23, 81, 126, 1);
}

._header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.no-data {
  text-align: center;
  font-family: Mulish;
  font-size: 20px;
  line-height: 23px;
  color: #bcbfc0;
}

/* .theme--light.v-data-table thead tr th {
  color: white;
} */
</style>
