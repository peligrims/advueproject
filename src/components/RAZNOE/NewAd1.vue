<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field name="title" label="Ad title" type="text" v-model="title" required :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea name="description" label="Ad description" type="text" v-model="description" clearable clear-icon="mdi-close-circle" :rules="[v => !!v || 'Description is required']" value="This is clearable text."
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <div v-if="imageData!=null">
              <v-img class="preview" :src="picture"></v-img>
              <br>
              <button @click="onUpload">Upload</button>
            </div>

            <input type="file" @change="previewImage" accept="image/*" >

          </v-flex>
        </v-layout>

        <div>
          <p>Progress: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>

        <v-layout row>
          <v-flex xs12>
            <v-img src="imageSrc" height="100" v-if="imageSrc"></v-img>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-switch label="Add to promo?" v-model="promo" color="primary"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
                :loading="loading"
                :disabled="!valid || !image || loading"
                class="success"
                @click="createAd"
            >
              Create ad
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    
  </v-container>
</template>


<script>
import firebase from 'firebase';

export default {
  name: 'Upload',
  data(){
    return{
      imageData: null,
      picture: null,
      uploadValue: 0
    }
  },
  methods:{
    previewImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },

    onUpload(){
      this.picture=null;
      const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.picture =url;
            });
          }
      );
    }

  }
}
</script>
<style scoped="">
img.preview {
  width: 200px;
}

</style>
