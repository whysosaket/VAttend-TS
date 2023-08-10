<script>
    export let record;
</script>

<tr class="bg-white border-b">
    <th scope="row" class="px-6 py-4">
        {record.name}
    </th>
    <td class="px-6 py-4">
        {record.employee_id}
    </td>
    <td class="px-6 py-4">
        {record.admin?"Yes":"No"}
    </td>
    <td class={`px-6 py-4 font-medium whitespace-nowrap`}>
        {record.date&&record.date.split("T")[0]}
    </td>
</tr>