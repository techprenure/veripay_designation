<template>
  <div class="">
    <h4 style="font-weight: bolder" class="pa-5">Manage Allowance</h4>
    <v-card>
      <v-row>
        <v-col cols="12">
          <div class="_header px-10 pt-5">
            <h4 style="font-size: 18px">
              Manage Allownace Names - Approved Listing
            </h4>
            <div>
             
              <v-btn
                style="font-size: 13px; background-color: #17517e; color: #fff"
                elevation="0"
                @click="dialog2 = true"
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
                        font-size: 13px;
                      "
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
                    style="color: red;  font-size:10px;text-transform: capitalize"
                    text
                    v-if="item.status"
                    @click="allowance_status(item)"
                    >Dactivate</v-btn
                  >
                  <v-btn
                    v-else
                    style="color: green;  font-size:10px;text-transform: capitalize"
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
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" width="400" persistent>
      <v-card class="text-center" style="text-align: center">
        <div
          class="text-h6 text-center pa-4"
          style="
            display: flex;
            justify-content: space-between;
            background-color: #f2f9ff;
            color: #17517e;
          "
        >
          <h4>Add Allowance Name</h4>
          <v-btn
            @click="dialog = false"
            text
            style="color: red; font-size: 12px; font-weight: 600"
            >Close</v-btn
          >
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-card-text
            style="font-size: 16px; font-weight: bolder"
            class="mb-3"
            densed
          >
            Create a new allowance name
          </v-card-text>
          <v-form>
            <v-text-field
              block
              label="Allowance Name"
              v-model="allowance"
              outlined
            >
            </v-text-field>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="createAllowanceName"
            >
              Submit
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
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
      allowance_name: "",
      salary_regime: "",
      allowance: "",
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
      allowances: null,
      regimes: null,
      allowanceItem: [],
    };
  },

  beforeMount() {
    this.populateAllowanceName();
    // this.populateSalarayRegime();
    this.populateAlowance();
  },

  watch: {
    //Track Allowance Code
    allowance_name(val) {
      console.log(this.allowances);
      const allowance = this.allowances.find((el) => el.allowance_name === val);
      this.allowanceCode = allowance.allowance_code;
    },
    //Track Salary Code
    salary_regime(val) {
      const regime = this.regimes.find((el) => el.regime_name === val);
      this.regimeCode = regime.regime_code;
    },
  },
  computed: {
    ...mapGetters({
        jwt: "getJwt",
            instu_code: "getInstuCode",
              baseURL:"baseURL"
    }),
  },
  methods: {
    edit(item) {
      this.dialog2 = true;
      this.allowance_edit = item.allowance_name;
      this.salary_edit = item.salreg;
      this.allowanceItem = item;
    },

    //Create Allowance Name
    async createAllowanceName() {
      if (this.allowance == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Empty Field!",
          width: 400,
        });
        this.dialog = true;
      } else {
        try {
          //Create Allowance Name
          const res = await axios({
            headers: {
              Authorization: `Bearer ${this.jwt}`,
            },
            method: "post",
            url: `${this.baseURL}/allowance`,
            data: {
              institution_code: this.instu_code,
              allowance_name: this.allowance,
              entered_by: "Veripay Integrated",
            },
          });

          console.log("ALLOWANCE RESPONSE", res);

          //check for success
          if (res.data.response.code == "00") {
            //
            this.Allowanceitems.push(this.allowance);
            this.allowance = "";
            const el = res.data.response.message.data;
            this.allowances.push({
              active: el.active,
              allowance_code: el.allowance_code,
              allowance_name: el.allowance_name,
              date: el.date,
              entered_by: el.created_by,
              institution: el.institution,
              institution_code: el.institution_code,
            });
            // this.items.push({
            //   allowance_name: el.allowance_name,
            //   institu: el.institution,
            //   enterby: el.entered_by,
            //   enteron: el.date.split("T")[0],
            //   status: el.active,
            //   instu_code: el.institution_code,
            //   allow_code: el.allowance_code,
            // });
            this.dialog = false;
            return Swal.fire({
              icon: "success",
              title: "Created",
              text: "Allowance Name Created",
              width: 400,
            });
            //Check if Not created
          } else if (res.data.response.code == "E203") {
            Swal.fire({
              icon: "error",
              title: "Not Created",
              text: "Allowance Name Not Created",
              width: 400,
            });
            //Check Error
          } else if (res.data.response.code == "E202") {
            Swal.fire({
              icon: "info",
              title: "Not Created",
              text: "Allowance Name Already Exist",
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
          url:`${this.baseURL}/allowance_regime`,

          data: {
            institution_code: this.instu_code,
            allowance_regime_code: item.allow_regime_code,
            active: !item.status,
          },
        });
        console.log(res);
        // console.log("STATUS", item.status, !item.status);
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

    //Populate allowance Table
    async populateAlowance() {
      console.log("start1");
      try {
       console.log("HERE");
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
              status: el.active,
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

    //Create Allowance(- Link Allowances to Regimes - )
    async createAllowance() {
      // console.log("HERE");
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
          console.log(res);
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
              status: data.active,
              allow_code: data.allowance_code,
              regime_code: data.regime_code,
              allow_regime_code: data.allowance_regime_code,
            });

            this.dialog2 = false;

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
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Allowance Not Created",
            width: 400,
          });
        }
      }
      this.dialog = false;
    },
    //Edit Allowance
    async editAllowance() {
      // console.log(this.allowanceItem);
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
        // console.log("Edit Allowance", res);
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
._header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* .theme--light.v-data-table thead tr th {
  color: white;
} */
</style>
