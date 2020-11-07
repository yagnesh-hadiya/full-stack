<?php  
include "dbConfig.php";
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$query = $db->query("SELECT * FROM images ORDER BY uploaded_on DESC");

	if($query->num_rows > 0){
		while($row = $query->fetch_assoc()){
		    $data[] = $row['file_name']; 
		  }
        $res['data'] = $data;
        // print_r($data);
		echo json_encode($res);
	}
	else
	{
        // return json_encode([]);
        print_r(json_encode([]));
	}
}

?>