<template>
  <div>
    <div class="row pt-3">
      <div class="col-4"></div>
      <div class="col">
        <form>

          <h3>Create an account</h3>
          <div class="form-group">
            <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp"
                   placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="loginInput" placeholder="Login">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="passwordInput" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-success">Sign Up</button>

        </form>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginComponent',
    data() {
      return {
        msg: 'Login',
      };
    },
  };
</script>

