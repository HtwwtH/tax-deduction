<template>

  <div class="deduction">
    <input type="checkbox" class="custom-checkbox" :id="chbox.id" name="" value="yes">
    <label :for="chbox.id">
      <p><b>{{ chbox.deduction }}</b> {{ $store.getters.getYearText(chbox.id) }}</p>
    </label>
  </div>

</template>

<script>
export default {
  props: {
    chbox: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/_vars.scss';

  .deduction {
    font-family: Lab Grotesque;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: $gray;
    margin-bottom: 16px;

    b {
      color: $black;
    }

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: $lightGray;
    }
  }

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

label {
  cursor: pointer;
}

.custom-checkbox+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  margin-bottom: 16px;
}
.custom-checkbox+label::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid $lightGray;
  border-radius: 6px;
  margin-right: 12px;
  background-repeat: no-repeat;
  background-position: center center;
}
.custom-checkbox:checked+label::before {
  border: none;
  background-image: url("/icons/checked.svg");
}
.custom-checkbox:not(:disabled):not(:checked)+label:hover::before {
  border-color: $black;
}

</style>