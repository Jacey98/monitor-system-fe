<template>
  <div id="main">
    <div id="settings">
      <div id="search">
        <el-input
          v-model="search"
          placeholder="请输入影像名称"
          prefix-icon="el-icon-search"
        />
      </div>
      <el-button size="medium" type="primary" @click="downloadExcel"
        >导出</el-button
      >
      <el-button size="medium" @click="addImage">新增</el-button>
      <el-button size="medium" @click="reload">刷新</el-button>
    </div>
    <!-- <p id="sum">已选{{ num }}项</p> 有bug，无法勾选-->
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.imageTgzName.toLowerCase().includes(search.toLowerCase())
        )
      "
      ref="multipleTable"
      tooltip-effect="dark"
      stripe
      border
      fixed
      style="width: 100%"
      height="740"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="42"> </el-table-column>
      <el-table-column fixed prop="imageTgzName" label="影像名称" width="195">
      </el-table-column>
      <el-table-column prop="collectTime" label="采集时间" width="101" sortable>
      </el-table-column>
      <el-table-column
        prop="spatialResolution"
        label="空间分辨率(m)"
        width="95"
      >
      </el-table-column>
      <el-table-column prop="processStatus" label="处理状态" width="78">
      </el-table-column>
      <el-table-column prop="longitudeRange" label="经度范围" width="130">
      </el-table-column>
      <el-table-column prop="latitudeRange" label="纬度范围" width="118">
      </el-table-column>
      <el-table-column prop="rangeArea" label="影像面积(km^2)" width="78">
      </el-table-column>
      <el-table-column prop="ndwiArea" label="水域面积(km^2)" width="78">
      </el-table-column>
      <el-table-column prop="proArea" label="禁养区面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="resArea" label="限养区面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="aquArea" label="养殖区面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="rcaArea" label="筏式养殖总面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="rcaCount" label="筏式养殖总数量" width="90">
      </el-table-column>
      <el-table-column prop="ccaArea" label="网箱养殖总面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="ccaCount" label="网箱养殖总数量" width="90">
      </el-table-column>
      <el-table-column prop="rcaProArea" label="筏式禁养面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="rcaProCount" label="筏式禁养数量" width="90">
      </el-table-column>
      <el-table-column prop="ccaProArea" label="网箱禁养面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="ccaProCount" label="网箱禁养数量" width="90">
      </el-table-column>
      <el-table-column prop="rcaResArea" label="筏式限养面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="rcaResCount" label="筏式限养数量" width="90">
      </el-table-column>
      <el-table-column prop="ccaResArea" label="网箱限养面积(km^2)" width="95">
      </el-table-column>
      <el-table-column prop="ccaResCount" label="网箱限养数量" width="90">
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="145"> -->
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          > -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增对话框-->
    <el-dialog title="新增数据" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" label-position="top">
        <el-form-item label="采集时间" required>
          <el-date-picker
            type="date"
            placeholder="选择时间"
            v-model="form.collectTime"
            style="width: 100%"
            placement="bottom-start"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="经度范围" required>
          <el-col :span="11">
            <el-input
              v-model="form.longitudeMin"
              placeholder="经度下限"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1" style="margin-left: 16px">-</el-col>
          <el-col :span="11">
            <el-input
              v-model="form.longitudeMax"
              placeholder="经度上限"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="纬度范围" required>
          <el-col :span="11">
            <el-input
              v-model="form.latitudeMin"
              placeholder="纬度下限"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1" style="margin-left: 16px">-</el-col>
          <el-col :span="11">
            <el-input
              v-model="form.latitudeMax"
              placeholder="纬度上限"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <!-- 上传影像压缩包 -->
      <el-upload
        class="upload"
        ref="upload"
        action="action"
        :http-request="fileUpload"
        :limit="1"
        :on-exceed="handleExceed"
      >
        <el-button slot="trigger" size="small">选取影像文件</el-button>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleUpload">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { imageAllImages } from "@/api";
import { imageDeleteImage } from "@/api";
import { imageImageAdd } from "@/api";
import Blob from "@/excel/Blob.js";
import Export2Excel from "@/excel/export2Excel.js";
const axios = require("axios");
export default {
  name: "ImageManagement",
  data: function () {
    return {
      tableData: [
        // {
        //   imageTgzName: "LC81180422015023LGN00",
        //   collectTime: "2015-01-23",
        //   spatialResolution: 15,
        //   processStatus: "已处理",
        //   longitudeRange: "119.81°-119.96°E",
        //   latitudeRange: "26.60°-26.70°N",
        //   rangeArea: 165.67,
        //   ndwiArea: 122.47,
        //   proArea: 40,
        //   resArea: 30,
        //   aquArea: 10,
        //   rcaArea: 20,
        //   rcaCount: 100,
        //   ccaArea: 20,
        //   ccaCount: 100,
        //   rcaProArea: 10,
        //   rcaProCount: 50,
        //   ccaProArea: 10,
        //   ccaProCount: 50,
        //   rcaResArea: 5,
        //   rcaResCount: 25,
        //   ccaResArea: 5,
        //   ccaResCount: 25,
        // },
      ],
      multipleSelection: [],
      search: "",
      num: 0,
      dialogFormVisible: false,
      form: {
        file: {},
        collectTime: "",
        longitudeMin: "",
        longitudeMax: "",
        latitudeMin: "",
        latitudeMax: "",
      },
      formLabelWidth: "100px",
      fileList: [
        {
          name: "",
          url: "",
        },
      ],
    };
  },
  methods: {
    async getAllImages() {
      let res = await imageAllImages();
      if (res.code === 200) {
        this.tableData = res.data;
      } else {
        this.$message.error({
          duration: 2000,
          message: res.msg,
        });
      }
      // console.log(this.tableData);
    },
    reload() {
      this.getAllImages();
    },
    addImage() {
      if (localStorage.getItem("authority") == 1) {
        this.dialogFormVisible = true;
      } else {
        alert("无权限！");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.num = val.length;
    },
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    handleDelete(index, row) {
      // console.log(this.tableData[index].imageTgzName, row);
      if (localStorage.getItem("authority") == 1) {
        this.$confirm("确认删除吗？", "提示", {
          iconClass: "el-icon-question", //自定义图标样式
          confirmButtonText: "确认", //确认按钮文字更换
          cancelButtonText: "取消", //取消按钮文字更换
          type: "warning", //提示类型
        }).then(async () => {
          let res = await imageDeleteImage({
            imageTgzName: this.tableData[index].imageTgzName,
          });
          if (res.code === 200) {
            this.reload();
          } else {
            this.$message.error({
              duration: 2000,
              message: res.msg,
            });
          }
        });
      } else {
        alert("无权限！");
      }
    },
    fileUpload(item) {
      this.form.file = item.file;
      // console.log(this.form.file);
    },
    cancleUpload() {
      this.dialogFormVisible = false;
      this.form = {
        file: {},
        collectTime: "",
        longitudeMin: "",
        longitudeMax: "",
        latitudeMin: "",
        latitudeMax: "",
      };
      this.fileList = [
        {
          name: "",
          url: "",
        },
      ];
      this.$refs.upload.clearFiles();
    },
    submitUpload() {
      // this.$refs.upload.submit();
      // console.log(this.form.file);
      if (
        JSON.stringify(this.form.file) !== "{}" &&
        this.form.collectTime &&
        this.form.longitudeMin &&
        this.form.longitudeMax &&
        this.form.latitudeMin &&
        this.form.latitudeMax
      ) {
        this.submit();
      } else {
        this.$message.error({
          duration: 2000,
          message: "请完整填写数据",
        });
      }
    },
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    async submit() {
      let fd = new FormData();
      fd.append("file", this.form.file);
      fd.append("collectTime", this.formatDate(this.form.collectTime));
      fd.append("longitudeMin", this.form.longitudeMin);
      fd.append("longitudeMax", this.form.longitudeMax);
      fd.append("latitudeMin", this.form.latitudeMin);
      fd.append("latitudeMax", this.form.latitudeMax);
      // console.log(fd);
      setTimeout(() => {
        this.$message.info({
          duration: 500000,
          message: "正在上传，请稍后",
        });
      }, 0);
      let res = await imageImageAdd(fd);
      this.$message.closeAll();
      if (res.code === 200) {
        this.cancleUpload();
        this.$message.success({
          duration: 2000,
          message: res.msg,
        });
        this.getAllImages();
      } else {
        this.$message.error({
          duration: 2000,
          message: res.msg,
        });
      }
    },
    handleExceed() {
      this.$message.warning("只能上传 1 个文件");
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    // 列表下载
    downloadExcel() {
      if (!this.multipleSelection.length) {
        this.$message.error({
          duration: 2000,
          message: "请选择数据",
        });
        return;
      }
      this.excelData = this.multipleSelection; // multipleSelection是一个数组，存储表格中选择的行的数据。
      this.export2Excel();
    },
    // 数据写入excel
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/export2Excel"); // 这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const tHeader = [
          "影像名称",
          "采集时间",
          "空间分辨率(m)",
          "处理状态",
          "经度范围",
          "纬度范围",
          "影像面积(km^2)",
          "水域面积(km^2)",
          "禁养区面积(km^2)",
          "限养区面积(km^2)",
          "养殖区面积(km^2)",
          "筏式养殖总面积(km^2)",
          "筏式养殖总数量",
          "网箱养殖总面积(km^2)",
          "网箱养殖总数量",
          "筏式禁养面积(km^2)",
          "筏式禁养数量",
          "网箱禁养面积(km^2)",
          "网箱禁养数量",
          "筏式限养面积(km^2)",
          "筏式限养数量",
          "网箱限养面积(km^2)",
          "网箱限养数量",
        ]; // 导出的表头名信息
        const filterVal = [
          "imageTgzName",
          "collectTime",
          "spatialResolution",
          "processStatus",
          "longitudeRange",
          "latitudeRange",
          "rangeArea",
          "ndwiArea",
          "proArea",
          "resArea",
          "aquArea",
          "rcaArea",
          "rcaCount",
          "ccaArea",
          "ccaCount",
          "rcaProArea",
          "rcaProCount",
          "ccaProArea",
          "ccaProCount",
          "rcaResArea",
          "rcaResCount",
          "ccaResArea",
          "ccaResCount",
        ]; // 导出的表头字段名，需要导出表格字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "test"); // 导出的表格名称，根据需要自己命名
      });
    },
    // 格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
  created() {
    this.getAllImages();
  },
  // mounted() {
  //   window.vue = this;
  // },
};
</script>

<style scoped lang='less'>
#main {
  width: 1200px;
  min-height: 100%;
  background-color: white;
  margin: auto;
  box-shadow: 0px 0px 10px rgb(219, 219, 219);
  padding: 50px;
  padding-bottom: 0;
  font-size: 20px;

  #settings {
    // border: 1px solid rgb(0, 0, 0);
    margin-bottom: 10px;
    #search {
      display: inline-block;
      width: 500px;
      margin-right: 368px;
    }
  }

  #sum {
    color: rgb(192, 196, 204);
    font-size: 15px;
  }
}
</style>
