<script>
    export let record;
</script>

<tr class="bg-white border-b">
    <th scope="row" class="px-6 py-4">
        {record.date&&record.date.split("T")[1].split(".")[0]}
    </th>
    <td class="px-6 py-4">
        {record.date&&record.date.split("T")[0]}
    </td>
    <td class="px-6 py-4">
        {record.distance&&record.distance.toFixed(2)}KM
    </td>
    <td class={`px-6 py-4 font-medium ${record.present?"text-green-700":"text-red-700"} whitespace-nowrap`}>
        {record.present?"Present":"Absent"}
    </td>
</tr>