<script>
    let text = "";
  </script>
  
  <style>
  
    .menu-bar {
      height: 20px;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #c0c0c0;
    }
  
    .menu-bar ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  
    .menu-bar li {
      display: inline-block;
      margin-right: 5px;
    }
  
    .menu-bar a {
      text-decoration: none;
      color: black;
      padding: 3px 5px;
      font-size: 12px;
      cursor: pointer;
    }
  
    .menu-bar a:hover {
      background-color: #c0c0c0;
    }
  
    .text-area {
      width: 100%;
      height: calc(100% - 20px);
      border: none;
      resize: none;
      font-size: 12px;
      padding: 5px;
      outline: none;
    }
  </style>
  
  <div class="menu-bar">
    <ul>
      <li><a>File</a></li>
      <li><a>Edit</a></li>
      <li><a>Format</a></li>
      <li><a>Help</a></li>
    </ul>
  </div>
  <textarea class="text-area" bind:value={text}></textarea>