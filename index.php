<?php
// Definir as variáveis para o tipo e o tamanho máximo dos arquivos
$tipos = array("image/jpeg", "image/png", "image/gif", "video/mp4", "video/avi");
$tamanho_maximo = 10 * 1024 * 1024; // 10 MB

// Verificar se o formulário foi enviado
if (isset($_POST["enviar"])) {
  // Verificar se o arquivo foi selecionado
  if (isset($_FILES["arquivo"]) && $_FILES["arquivo"]["error"] == 0) {
    // Obter as informações do arquivo
    $nome = $_FILES["arquivo"]["name"];
    $tipo = $_FILES["arquivo"]["type"];
    $tamanho = $_FILES["arquivo"]["size"];
    $temporario = $_FILES["arquivo"]["tmp_name"];

    // Verificar se o tipo do arquivo é válido
    if (in_array($tipo, $tipos)) {
      // Verificar se o tamanho do arquivo é válido
      if ($tamanho <= $tamanho_maximo) {
        // Definir o caminho da pasta onde o arquivo será salvo
        $pasta = "uploads/";
        // Mover o arquivo do temporário para a pasta
        if (move_uploaded_file($temporario, $pasta . $nome)) {
          // Exibir uma mensagem de sucesso
          echo "<p>Arquivo enviado com sucesso!</p>";
          echo "<p>Nome: $nome</p>";
          echo "<p>Tipo: $tipo</p>";
          echo "<p>Tamanho: $tamanho bytes</p>";
        } else {
          // Exibir uma mensagem de erro
          echo "<p>Erro ao mover o arquivo para a pasta.</p>";
        }
      } else {
        // Exibir uma mensagem de erro
        echo "<p>Erro: o arquivo é maior que o permitido.</p>";
      }
    } else {
      // Exibir uma mensagem de erro
      echo "<p>Erro: o tipo do arquivo é inválido.</p>";
    }
  } else {
    // Exibir uma mensagem de erro
    echo "<p>Erro: nenhum arquivo foi selecionado.</p>";
  }
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Upload de Arquivos - YOU WEB</title>
</head>
<body>
  <h1>Upload de Arquivos - YOU WEB</h1>
  <p>O seu site de vídeos favorito</p>
  <form action="upload.php" method="post" enctype="multipart/form-data">
    <label for="arquivo">Selecione um arquivo:</label>
    <input type="file" id="arquivo" name="arquivo" accept="image/*, video/*">
    <input type="submit" id="enviar" name="enviar" value="Enviar">
  </form>
</body>
</html>
