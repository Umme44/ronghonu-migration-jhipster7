package com.bits.hr.web.rest;

import com.bits.hr.domain.User;
import com.bits.hr.domain.enumeration.RequestMethod;
import com.bits.hr.errors.BadRequestAlertException;
import com.bits.hr.service.EventLog.EventLoggingPublisher;
import com.bits.hr.service.LeaveAllocationService;
import com.bits.hr.service.config.CurrentEmployeeService;
import com.bits.hr.service.dto.LeaveAllocationDTO;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.bits.hr.domain.LeaveAllocation}.
 */
@RestController
@RequestMapping("/api/attendance-mgt/leave-allocations")
public class LeaveAllocationResource {

    private static final String ENTITY_NAME = "leaveAllocation";
    private final Logger log = LoggerFactory.getLogger(LeaveAllocationResource.class);
    private final LeaveAllocationService leaveAllocationService;

    private final CurrentEmployeeService currentEmployeeService;
    private final EventLoggingPublisher eventLoggingPublisher;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public LeaveAllocationResource(
        LeaveAllocationService leaveAllocationService,
        CurrentEmployeeService currentEmployeeService,
        EventLoggingPublisher eventLoggingPublisher
    ) {
        this.leaveAllocationService = leaveAllocationService;
        this.currentEmployeeService = currentEmployeeService;
        this.eventLoggingPublisher = eventLoggingPublisher;
    }

    /**
     * {@code POST  /leave-allocations} : Create a new leaveAllocation.
     *
     * @param leaveAllocationDTO the leaveAllocationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new leaveAllocationDTO, or with status {@code 400 (Bad Request)} if the leaveAllocation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LeaveAllocationDTO> createLeaveAllocation(@RequestBody LeaveAllocationDTO leaveAllocationDTO)
        throws URISyntaxException {
        log.debug("REST request to save LeaveAllocation : {}", leaveAllocationDTO);
        if (leaveAllocationDTO.getId() != null) {
            throw new BadRequestAlertException("A new leaveAllocation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LeaveAllocationDTO result = leaveAllocationService.save(leaveAllocationDTO);
        User user = currentEmployeeService.getCurrentUser().get();
        eventLoggingPublisher.publishEvent(user, result, RequestMethod.POST, "LeaveAllocation");
        return ResponseEntity
            .created(new URI("/api/attendance-mgt/leave-allocations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /leave-allocations} : Updates an existing leaveAllocation.
     *
     * @param leaveAllocationDTO the leaveAllocationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated leaveAllocationDTO,
     * or with status {@code 400 (Bad Request)} if the leaveAllocationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the leaveAllocationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("")
    public ResponseEntity<LeaveAllocationDTO> updateLeaveAllocation(@RequestBody LeaveAllocationDTO leaveAllocationDTO)
        throws URISyntaxException {
        log.debug("REST request to update LeaveAllocation : {}", leaveAllocationDTO);
        if (leaveAllocationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LeaveAllocationDTO result = leaveAllocationService.save(leaveAllocationDTO);
        User user = currentEmployeeService.getCurrentUser().get();
        eventLoggingPublisher.publishEvent(user, result, RequestMethod.PUT, "LeaveAllocation");
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, leaveAllocationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /leave-allocations} : get all the leaveAllocations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of leaveAllocations in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LeaveAllocationDTO>> getAllLeaveAllocations(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of LeaveAllocations");
        Page<LeaveAllocationDTO> page = leaveAllocationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        User user = currentEmployeeService.getCurrentUser().get();
        eventLoggingPublisher.publishEvent(user, Optional.empty(), RequestMethod.GET, "LeaveAllocation");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /leave-allocations/:id} : get the "id" leaveAllocation.
     *
     * @param id the id of the leaveAllocationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the leaveAllocationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LeaveAllocationDTO> getLeaveAllocation(@PathVariable Long id) {
        log.debug("REST request to get LeaveAllocation : {}", id);
        Optional<LeaveAllocationDTO> leaveAllocationDTO = leaveAllocationService.findOne(id);
        User user = currentEmployeeService.getCurrentUser().get();

        if (leaveAllocationDTO.isPresent()) {
            eventLoggingPublisher.publishEvent(user, leaveAllocationDTO.get(), RequestMethod.GET, "LeaveAllocation");
        }
        return ResponseUtil.wrapOrNotFound(leaveAllocationDTO);
    }

    /**
     * {@code DELETE  /leave-allocations/:id} : delete the "id" leaveAllocation.
     *
     * @param id the id of the leaveAllocationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveAllocation(@PathVariable Long id) {
        log.debug("REST request to delete LeaveAllocation : {}", id);
        Optional<LeaveAllocationDTO> leaveAllocationDTO = leaveAllocationService.findOne(id);
        User user = currentEmployeeService.getCurrentUser().get();

        if (leaveAllocationDTO.isPresent()) {
            eventLoggingPublisher.publishEvent(user, leaveAllocationDTO.get(), RequestMethod.DELETE, "LeaveAllocation");
        }
        leaveAllocationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}