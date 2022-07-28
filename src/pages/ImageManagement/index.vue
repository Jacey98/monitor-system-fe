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
      <el-button size="medium" type="primary">导出</el-button>
      <el-button size="medium" @click="dialogFormVisible = true"
        >新增</el-button
      >
      <el-button size="medium">刷新</el-button>
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
      <el-form :model="form">
        <el-form-item label="采集时间">
          <el-input
            v-model="form.collectTime"
            placeholder="yyyy-mm-dd"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度范围">
          <el-input
            v-model="form.longitudeRange"
            placeholder="min-max"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度范围">
          <el-input
            v-model="form.latitudeRange"
            placeholder="min-max"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 上传影像压缩包 -->
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small">选取影像文件</el-button>
        <el-button
          style="margin-left: 10px"
          size="small"
          type="primary"
          @click="submitUpload"
          >上传到服务器</el-button
        >
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ImageManagement",
  data: function () {
    return {
      tableData: [
        {
          imageTgzName: "LC81190412013296LGN01",
          collectTime: "2013-10-23",
          processStatus: "已处理",
          longitudeRange: "119.81°-119.96°E",
          latitudeRange: "26.60°-26.70°N",
          rangeArea: 100,
          ndwiArea: 80,
          proArea: 40,
          resArea: 30,
          aquArea: 10,
          rcaArea: 20,
          rcaCount: 100,
          ccaArea: 20,
          ccaCount: 100,
          rcaProArea: 10,
          rcaProCount: 50,
          ccaProArea: 10,
          ccaProCount: 50,
          rcaResArea: 5,
          rcaResCount: 25,
          ccaResArea: 5,
          ccaResCount: 25,
        },
        {
          imageTgzName: "LC81190412013297LGN01",
          collectTime: "2013-10-24",
          processStatus: "已处理",
          longitudeRange: "119.81°-119.96°E",
          latitudeRange: "26.60°-26.70°N",
          rangeArea: 100,
          ndwiArea: 80,
          proArea: 40,
          resArea: 30,
          aquArea: 10,
          rcaArea: 20,
          rcaCount: 100,
          ccaArea: 20,
          ccaCount: 100,
          rcaProArea: 10,
          rcaProCount: 50,
          ccaProArea: 10,
          ccaProCount: 50,
          rcaResArea: 5,
          rcaResCount: 25,
          ccaResArea: 5,
          ccaResCount: 25,
        },
        
      ],
      multipleSelection: [],
      search: "",
      num: 0,
      dialogFormVisible: false,
      form: {
        collectTime: "",
        longitudeRange: "",
        latitudeRange: "",
      },
      formLabelWidth: "100px",
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.num = val.length;
    },
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    handleDelete(index, row) {
      console.log(index, row);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
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
