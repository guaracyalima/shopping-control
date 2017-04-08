var list = [
	{
		"desc":"rice",
		"amount":"1",
		"value":"5.40"
	},
	{
		"desc":"beer",
		"amount":"12",
		"value":"1.99"
	},
	{
		"desc":"meat",
		"amount":"1",
		"value":"15.00"
	},
];

function getTotal(list)
{
	var total = 0;
	for (var key in list) {
		total += list[key].value * list[key].amount; //calcula o total
	}
	document.getElementById("totalValue").innerHTML = formatValue(total);
	//return total;
}

function setList(list)
{
	var table = '' +
		'<thead>'+
		'<tr>'+
		'<td>Description</td>'+
		'<td>Amount</td>'+
		'<td>Value</td>'+
		'<td>Action</td>'+
		'</tr>'+
		'</thead>'+
		'<tbody>';

	for(var key in list)
	{
		table += '<tr>'+
				'<td>'+ formatDesc (list[key].desc )+'</td>'+
				'<td>'+ formatAmount(list[key].amount) +'</td>'+
				'<td>'+ formatValue(list[key].value) +'</td>'+
				'<td>'+
					'<button class="btn btn-primary" onclick="setUpdate('+key+');">Edit</button>'+
					'<button class="btn btn-danger" onclick="deleteData('+key+');">Delete</button>'+
				'</td>';
	}

	table += '</tbody>';

	document.getElementById("listTable").innerHTML = table;
	getTotal(list);
	saveListStorage(list);
}

function formatDesc (desc)
{
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function formatAmount(amount)
{
	return parseInt(amount);
}

function formatValue(value)
{
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".", ",");
	str = "R$ "+ str;
	return str;
}

function addData()
{
	if (!validation())
	{
		return;
	}
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list.unshift(
		{
			"desc": desc,
			"amount": amount,
			"value": value
		}
	);

	setList(list);
}

function setUpdate(id)
{
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;

	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";

	document.getElementById("inputIdUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+ id +'">';
}

function resetForm()
{
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	document.getElementById("inputIdUpdate").innerHTML = "";
	document.getElementById("errors").style.display = "none";

}

function updateData(id)
{
	if ( !validation())
	{
		return;
	}
	var id = document.getElementById("idUpdate").value;

	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] =  {
		"desc":desc,
		"amount":amount,
		"value":value
	};
	resetForm();
	setList(list);
}

function deleteData(id)
{
	if(confirm("Delete this item?")){
		if (id === list.length-1){//igual ao ultimo registro
			list.pop(); //limpa o ultimo registro
		}else if(id === 0){
			list.shift(); //limpa o primeiro registro do array
		}else{
			var arrayAuxIni = list.slice(0,id); //pega do indice 0 ate o id
			var arrayAuxEnd = list.slice(id+1); //pega ate o ultimo indice do array partindo do id
			list = arrayAuxIni.concat(arrayAuxEnd);
		}
		setList(list);
	}
}

function validation()
{
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	var errors = "";

	if (desc === "")
	{
		errors += '<p class="text-alert"> Fill out description </p>';
	}
	if(amount === "")
	{
		errors += '<p class="text-alert"> Fill out quantity </p>';
	}
	else if(amount != parseInt(amount))
	{
		errors += '<p class="text-danger"> Fill out valid amount </p>';
	}
	if(value === "")
	{
		errors += '<p class="text-alert"> Fill out quantity </p>';
	}
	else if(value != parseFloat(value))
	{
		errors += '<p class="text-danger"> Fill out valid value </p>';
	}
	if(errors != "")
	{
		document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
	}else{
		return 1;
	}

}

function deletList() 
{
	if (confirm("Dele this list?")) 
	{
		list = [];
		setList(list);
	}
}

function saveListStorage(list)
{
	var jsonStr = JSON.stringify(list); //transforma o objeto numa string
	localStorage.setItem("list", jsonStr); 
	console.log(jsonStr);
}

function initListStorage() 
{
	var testList = localStorage.getItem("list");

	if (testList) 
	{
		list = JSON.parse(testList); //transforma a string em JSON para objetoJS
	}

	setList(list);
}
console.log("O total e "+ validation());
//setList(list);

initListStorage();