<template>
  <div class="">
    <h4 style="font-weight: bolder" class="pa-5">Manage Qualificaton</h4>
    <v-card>
      <v-row>
        <v-col cols="12">
          <div class="_header px-10 pt-5">
            <h4 style="font-size: 18px">Qualificaton Listing</h4>
            <div>
              <v-btn
                style="font-size: 13px; background-color: #17517e; color: #fff"
                elevation="0"
                @click="dialog2 = true"
                >Add New</v-btn
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
                  </v-col>
                </v-row>
              </v-card-title>
              <v-data-table
                :headers="headers"
                class="table-striped"
                :items="items"
              >
                <template v-slot:item.more="{ item }">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        text
                        v-bind="attrs"
                        v-on="on"
                        :disabled="item.approved == 1"
                      >
                        <img src="../../public/Vector.svg" alt="" />
                      </v-btn>
                    </template>
                    <v-list>
                      <v-btn text block @click="edit(item)">
                        <v-list-item>Edit</v-list-item>
                      </v-btn>
                      <v-btn text block @click="deleteN(item)">
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
    <!-- DIALOG FOR DELETE -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <div class="label">
          <h4>Delete Manage Qualification</h4>
        </div>

        <div class="center">
          <img src="../../public/error_40px.png" alt="" />
        </div>
        <v-card-title class="text-h5"
          ><i class="label1_text mt-4">Are you sure you want to delete</i> "{{
            deleteName
          }}"</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteDeductionName"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- EDIT MANAGE QUALIFICATION  -->
    <v-dialog v-model="dialogEdit" width="600" persistent>
      <v-card class="text-center" style="text-align: center">
        <div style="background-color: #f2f9ff; color: #17517e">
          <v-row>
            <v-col class="text-h6 text-center pa-4" cols="8"
              >Qualificaton</v-col
            >
            <v-col cols="2">
              <v-btn
                text
                style="color: green; font-size: 12px; font-weight: 600"
                ><img
                  @click="dialogEdit = false"
                  src="../../public/cancel.svg"
                  alt=""
              /></v-btn>
            </v-col>
          </v-row>
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-card-text
            style="font-size: 16px; font-weight: bolder"
            class="mb-3"
            densed
          >
            Edit Qualificaton
          </v-card-text>
          <v-form>
            <v-text-field
              v-model="editQualificationName"
              label="Qualification Name"
              outlined
            ></v-text-field>
            <v-select
              v-model="editQualificationType"
              :items="qualificationTypeSelect"
              label="Qualification type"
              outlined
            ></v-select>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="createManageQualification"
            >
              Submit
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <!-- CREATING QUALIFICATION -->
    <v-dialog v-model="dialog2" width="400">
      <v-card class="text-center" style="text-align: center">
        <div
          class="text-h6 text-center pa-4"
          style="background-color: #f2f9ff; color: #17517e"
        >
          Qualificaton
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-card-text
            style="font-size: 16px; font-weight: bolder"
            class="mb-3"
            densed
          >
            Add Qualificaton
          </v-card-text>
          <v-form>
            <v-text-field
              v-model="qualificationName"
              label="Qualification Name"
              outlined
            ></v-text-field>
            <v-select
              v-model="qualificationType"
              :items="qualificationTypeSelect"
              label="Qualification type"
              outlined
            ></v-select>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="createManageQualification"
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
      dialog2: false,
      headers: [
        {
          text: "Action",
          value: "more",
        },
        {
          text: "Institution",
          value: "institution",
        },
        {
          text: "Qualification Type",
          value: "qualification_type",
        },
        {
          text: "Qualification",
          value: "qualification",
        },

        {
          text: "Date Created",
          value: "date_created",
        },
      ],
      items: [],
      qualificationName: "",
      // dialogDelete: false,
      qualificationType: "",
      // dialogEdit: false,

      qualificationTypeSelect: [],
    };
  },

  beforeMount() {
    this.populateManageQualification();
    this.populateQualificationType();
  },

  watch: {},
  computed: {
    ...mapGetters({
      jwt: "getJwt",
      instu_code: "getInstuCode",
      baseURL: "baseURL",
    }),
  },
  methods: {
    async populateQualificationType() {
      try {
        // console.log("HERE");
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
          method: "GET",
          url: `${this.baseURL}/qualification_type?institution_code=${this.instu_code}`,
        });
        console.log("qualification type", res);
        if (res.data.response.code == "00") {
          res.data.response.message.data.forEach((el) => {
            this.qualificationTypeSelect.push({
              value: el.qualification_type_code,
              text: el.type_name,
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Create manage qualification
    async createManageQualification() {
      if (this.qualificationName == "" || this.qualificationType == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Empty Field!",
          width: 400,
        });
      } else {
        try {
          const res = await axios({
            headers: {
              Authorization: `Bearer ${this.jwt}`,
            },
            method: "post",
            url: `${this.baseURL}/qualification`,
            data: {
              institution_code: this.instu_code,
              qualification_name: this.qualificationName,
              qualification_type_code: this.qualificationType,
              entered_by: "9b2b233117",
            },
          });

          //check for success
          console.log("qualification", res);
          const message = res.data.response.message.message;

          if (res.data.response.code == "00") {
            //console.log("Manage Qualification RESPONSE", res);
            const el = res.data.response.message.data;
            this.items.push({
              active: el.approved,
              institution: el.institution,
              qualification_type: el.qualification_type_name,
              date_created: el.entered_on.split("T")[0],
              entered_by: el.entered_by,
              qualification: el.qualification_name,
            });
            (this.qualificationName = ""), (this.qualificationType = "");
            this.dialog2 = false;
            return Swal.fire({
              icon: "success",
              title: "Created",
              text: message,
              width: 400,
            });
            //Check if Not create ministry
          } else {
            Swal.fire({
              icon: "error",
              title: "Not Created",
              text: message,
              width: 400,
            });
            //Check Error
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
            width: 400,
          });
          console.log(error);
        }
      }
    },

    // Populate manage qualification Table
    async populateManageQualification() {
      try {
        // console.log("HERE");

        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
          method: "GET",
          url: `${this.baseURL}/qualification?institution_code=${this.instu_code}`,
        });
        console.log("TEST 111");
        console.log("manage qualification", res);
        console.log("TEST 2");

        if (res.data.response.code == "00") {
          res.data.response.message.data.forEach((el) => {
            console.log("Qualification", el);
            this.items.push({
              approved: el.approved,
              institution: el.institution,
              qualification_type: el.qualification_type_name,
              date_created: el.entered_on.split("T")[0],
              entered_by_name: el.entered_by_name,
              entered_by: el.entered_by,
              qualification_code: el.qualification_code,
              qualification: el.qualification_name,
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    //Edit Allowance
    edit(item) {
      this.dialogEdit = true;
      this.deleteName = item.qualification;
      this.qualificationItem = item;
    },

    async editAllowance() {
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
        } else if (res.data.response.code == "E400") {
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
    deleteN(item) {
      this.dialogDelete = true;
      this.deleteName = item.qualification;
      this.qualificationItem = item;
    },

    //Delete Allowance
    async deleteQualification() {
      console.log("delete", item);
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },

          method: "delete",
          url: `${this.baseURL}/qualification`,
          data: {
            entered_by: this.qualificationItem.entered_by,
            institution_code: this.instu_code,
            qualification_code: item.qualification_code,
          },
        });

        if (res.data.response.code == "00") {
          const row = this.items.findIndex(
            (el) => el.qualification_code === item.qualification_code
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
</style>
