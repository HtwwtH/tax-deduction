<template>
  <div class="overlay">
    <form action="" class="form" v-click-outside="closeForm">
      <div class="form__inner">
        <button type="button" class="close" @click="closeForm">
          <img src="/icons/close.svg" alt="">
        </button>
        <div class="title">Налоговый вычет</div>
        <p class="description">Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.</p>
        <div class="field">
          <div class="title">Ваша зарплата в месяц</div>
          <input v-bind:class="{ errorField: errorField }" @input="validate" v-model="salary" type="number" placeholder="Введите данные" value="">
          <button :disabled="errorField" type="button" @click="countPayments" class="count">Рассчитать</button>

          <div v-if="$store.getters.getDeductionsVisible" class="counted">
            <div class="title">Итого можете внести в качестве досрочных:</div>
            <Checkbox v-for="item in $store.getters.getDeductions" :key="item.id" :chbox="item" />
          </div>
        </div>

        <div class="field button-field">
          <div class="title">Что уменьшаем?</div>
          <button type="button" class="btn btn--xs btn--red">Платёж</button>
          <button type="button" class="btn btn--xs btn--gray">Срок</button>
        </div>
      </div>

      <button type="submit" class="btn btn--wide btn--red btn--red-shadow form__btn">Добавить</button>

    </form>
  </div>

</template>

<script>
import { mapActions } from 'vuex';
import Checkbox from "./Checkbox";

export default {
  components: {
    Checkbox,
  },
  data() {
    return {
      salary: '',
      errorField: false,
    }
  },
  methods: {
    ...mapActions(['clearHistory', 'setSalary', 'showDeductions', 'countDeductions']),
    async countPayments() {
      await this.clearHistory();
      await this.setSalary(this.salary);
      await this.countDeductions(260000);
      this.showDeductions();
    },
    validate () {
      if (this.salary < 0) {
        this.errorField = true;
      }
      else {
        this.errorField = false;
      }
    },
    closeForm() {
      this.$emit('closeForm');
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/_vars.scss';
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    background: $gradient;
  }
  button:disabled {
    opacity: .5;
  }
  .form {
    position: absolute;
    top: 120px;
    max-width: 552px;
    background: $white;
    padding: 32px;
    border-radius: 30px;

    .title {
      color: $black;
      font-weight: 500;
      font-size: 28px;
      line-height: 40px;
      margin-bottom: 16px;
    }

    .description {
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: $gray;
      margin-bottom: 24px;
    }

    .field {
      .title {
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 8px;
      }

      input {
        font-family: 'Lab Grotesque';
        border: 1px solid $lightGray;
        padding: 8px 10px;
        border-radius: 3px;
        font-size: 14px;
        line-height: 24px;
        color: $black;
        width: 100%;
        margin-bottom: 8px;

        &::placeholder {
          color: $mediumGray;
        }
      }

      .errorField {
        border: 1px solid red;
        color: red;
      }

      button.count {
        font-family: 'Lab Grotesque';
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: $red;
      }

      &.button-field {
        display: flex;
        align-items: flex-start;
        margin-bottom: 40px;
        margin-top: 28px;

        .title {
          margin-right: 32px;
        }

        button {
          margin-right: 16px;
        }
      }
    }

    .counted {
      .title {
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 16px;
        margin-top: 16px;
      }

      .deduction {
        font-family: Lab Grotesque;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: $gray;

        b {
          color: $black;
        }
      }
    }
  }
  .form__inner {
    position: relative;

    button.close {
      position: absolute;
      top: 0;
      right: 0;
      img {
        width: 18px;
        height: 18px;
      }
    }
  }

  @media screen and (max-width: 1440px) {
    .form {
      max-width: 453px;
    }
  }
  @media screen and (max-width: 768px) {
    .form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 100%;
      border-radius: 0;
      top: 0;
      min-height: 100vh;
      padding: 32px 16px 16px;

      .form__inner {
        height: 100%;
      }

      .title {
        font-size: 18px;
        line-height: 24px;
      }

      .description {
        font-size: 12px;
        line-height: 16px;
      }

      .counted {
        .title {
          width: 60%;
        }
      }

      .button-field {
        flex-wrap: wrap;

        .title {
          width: 100%;
        }
      }

      .form__btn {
        height: 40px;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
</style>