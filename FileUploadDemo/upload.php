<?php  
include "dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $statusMsg = "";

        if (isset($_FILES['file'])) {
            $targetDir = "Images/";
            $fileName = $_FILES["file"]["name"];
            $fileType = $_FILES["file"]["type"];
            if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetDir . $fileName)){
                $insert = $db->query("INSERT into images (file_name, uploaded_on) VALUES ('".$fileName."', NOW())");
                if($insert){
                    $statusMsg = null;
                }else{
                    $statusMsg = "File upload failed, please try again.";
                } 
            }else{
                $statusMsg = "Sorry, there was an error uploading your file.";
            }
        }
        if($statusMsg) print_r($statusMsg); 
}

?> 