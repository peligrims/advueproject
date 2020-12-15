<template>
  <v-row justify="center">
    <v-dialog v-model="modal" persistent max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Edit ad
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field name="title" label="Title" type="text" v-model="editedTitle"
          ></v-text-field>
          <v-text-field name="description" label="Description" type="text" multi-line v-model="editedDescription"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onCancel">
            Candel
          </v-btn>
          <v-btn text class="success" flat @click="onSave">
           Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      dialog: false,
      modal: false,
      editedDescription: this.ad.description,
      editedTitle: this.ad.title
    }
  },
  methods: {
    onCancel () {
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
      this.modal = false
    },
    onSave () {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })

        this.modal = false
      }
    }
  }
}
</script>
